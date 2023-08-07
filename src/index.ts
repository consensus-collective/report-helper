import {
  Abi,
  createPublicClient,
  http,
  decodeEventLog,
  isAddress,
  parseAbi,
} from 'viem'
import { sepolia } from 'viem/chains'
import { CaseInsensitiveMap, importAbi, readFile, splitRange } from './misc'
import { outputPath } from './logger'
import log from './logger'
import chalk from 'chalk'

const client = createPublicClient({
  chain: sepolia,
  transport: http('https://gateway.tenderly.co/public/sepolia'),
})

type AddressLike = `0x${string}`

async function isContract(address: AddressLike, block: number) {
  return (
    (await client.getBytecode({
      address: address,
      blockNumber: BigInt(block),
    })) !== undefined
  )
}

async function getCreationBlock(address: AddressLike) {
  log.debug(`Getting creation block of contract ${chalk.yellowBright(address)}`)

  let start = 0
  let end = Number(await client.getBlockNumber())
  while (start <= end) {
    const mid = Math.ceil((start + end) / 2)
    log.debug(`Searching block: ${chalk.yellowBright(mid)}`)

    const createdPrevBlock = await isContract(address, mid - 1)
    const createdThisBlock = await isContract(address, mid)

    if (!createdPrevBlock && createdThisBlock) {
      log.debug(`Creation block found: ${chalk.yellowBright(mid)}`)
      return mid
    }

    // creation block shd be in LHS
    if (createdPrevBlock && createdThisBlock) {
      end = mid - 1
      continue
    }
    // creation block shd be in RHS
    else if (!createdThisBlock) {
      start = mid + 1
      continue
    }
  }
  log.debug(`ERROR: Creation block not found`)
  return -1
}

async function getContractLog(
  contractAddress: AddressLike,
  startBlock: number,
  endBlock: number,
) {
  log.debug(
    `Getting eventLogs for ${chalk.yellowBright(
      `${contractAddress}: [${startBlock} , ${endBlock}]`,
    )}`,
  )
  return await client.getLogs({
    address: contractAddress,
    fromBlock: BigInt(startBlock),
    toBlock: BigInt(endBlock),
  })
}
interface IConfig {
  name: string
  discord: string
}

async function main() {
  const start = performance.now()
  log.debug('Parsing config file...')
  const config = JSON.parse(await readFile('src/config.json'))

  let address = config['contractAddress']
  if (!address || !isAddress(address)) {
    log.error('contractAddress not found. Pls update config.json')
    process.exit(1)
  }

  log.debug('Parsing user config from config.json...')
  const parsedConfig = config['userConfig'].map((u: any) => {
    return [Object.keys(u)[0] as AddressLike, Object.values(u)[0]]
  })

  log.debug(`Found ${chalk.yellowBright(`${parsedConfig.length}`)} users. `)

  const addressList = new CaseInsensitiveMap<AddressLike, IConfig>(parsedConfig)
  const groupMemberList: {
    address: AddressLike
    name: string
    discordId: string
  }[] = []

  log.debug('Parsing entries into a CaseInsensitiveMap...')
  addressList.forEach((i, key) => {
    const newEntries = {
      address: key,
      name: Object.values(i)[0],
      discordId: Object.values(i)[1],
    }
    log.debug(
      `New entries added: ${chalk.yellowBright(
        Object.entries(newEntries).map(([key, value]) => ` ${key}: ${value} `),
      )}`,
    )
    groupMemberList.push(newEntries)
  })
  log.debug(
    `Connected to network: ${chalk.yellowBright(
      client.chain.name,
    )} url: ${chalk.yellowBright(client.transport.url)}`,
  )

  const creationBlock = await getCreationBlock(address)

  if (creationBlock === -1) {
    console.error('creation block not found for: ', address)
    process.exit(1)
  }

  const currBlock = Number(await client.getBlockNumber())
  log.debug(
    `Start fetching eventLogs from block ${chalk.yellowBright(
      creationBlock,
    )} to ${chalk.yellowBright(currBlock)}`,
  )

  let chunkSize
  if (config['chunkSize']) {
    chunkSize = Number(config['chunkSize'])
  } else {
    log.debug(
      `chunkSize not found. Set to ${chalk.yellowBright(500)} by default`,
    )
    chunkSize = 500
  }

  const ranges = splitRange(creationBlock, currBlock, chunkSize)
  log.debug(
    `Chunk size: ${chalk.yellowBright(
      chunkSize,
    )}, # of chunks: ${chalk.yellowBright(ranges.length)}`,
  )
  const promises: any[] = []

  for (const r of ranges) {
    promises.push(await getContractLog(address, r[0], r[1]))
  }

  const logsArr = await Promise.all(promises)
  log.debug(
    `All eventLogs fetched. # of logs: ${chalk.yellowBright(logsArr.length)}`,
  )

  const sortedLogs = logsArr
    .filter((logs) => logs.length > 0)
    .flat()
    .sort((a, b) => (Number(a.blockNumber) > Number(b.blockNumber) ? 1 : -1))
    .sort((a, b) => (Number(a.logIndex) > Number(b.logIndex) ? 1 : -1))

  const table = []

  let contractAbi: Abi
  if (config['abi']) {
    try {
      log.debug(
        `Importing contract abi from ${chalk.redBright(config['abi'])}...`,
      )
      contractAbi = await importAbi(config['abi'])
    } catch {
      log.error('Failed to read ABI.')
      process.exit(1)
    }
  } else {
    log.error('Contract ABI not found.')
    process.exit(1)
  }

  for (const i of sortedLogs) {
    log.debug(`Decoding eventLog for txn: ${i['transactionHash']}`)
    const decodedLog = decodeEventLog({
      abi: contractAbi,
      data: i['data'],
      topics: i['topics'],
    })
    const sender = (await client.getTransaction({ hash: i['transactionHash'] }))
      .from

    const alias = addressList.get(sender)?.name ?? sender

    table.push({
      sender: alias,
      event: decodedLog['eventName'],
      args: Object.entries(decodedLog['args']).map(
        ([key, value]) =>
          `${key}: ${addressList.get(value as AddressLike)?.name ?? value}`,
      ),
      txnHash: i['transactionHash'],
      logIdx: Number(i.logIndex),
    })
  }
  const end = performance.now()
  const timeSpan = end - start
  log.info(
    `Fetched all decoded logs. Done in ${chalk.yellowBright(
      `${timeSpan / 1000} s.\n`,
    )}`,
  )

  log.info('Group member list:')
  log.table(groupMemberList)

  log.info(`\nEventLogs for contract ${address}:`)
  log.table(table)

  if (outputPath) {
    log.debug(`Table stored in ${outputPath}`)
  }
}

main()
