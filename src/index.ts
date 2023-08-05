import { Abi, createPublicClient, http, decodeEventLog } from 'viem'
import { sepolia } from 'viem/chains'
import BallotAbi from './abis/Ballot2.json'
import { CaseInsensitiveMap, splitRange } from './misc'

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
  let start = 0
  let end = Number(await client.getBlockNumber())
  while (start <= end) {
    const mid = Math.ceil((start + end) / 2)
    const createdPrevBlock = await isContract(address, mid - 1)
    const createdThisBlock = await isContract(address, mid)

    if (!createdPrevBlock && createdThisBlock) {
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
  return -1
}

async function getContractLog(
  contractAddress: AddressLike,
  startBlock: number,
  endBlock: number,
) {
  return await client.getLogs({
    address: contractAddress,
    fromBlock: BigInt(startBlock),
    toBlock: BigInt(endBlock),
  })
}
interface Config {
  name: string
  discord: string
}

let addressConfig = new CaseInsensitiveMap<AddressLike, Config>([
  [
    '0xb66c6d8d96faa683a4eb2cb4b854f7bb2295e01e',
    { name: 'Alice', discord: 'haha123' },
  ],
  [
    '0x1E2cD78882b12d3954a049Fd82FFD691565dC0A5',
    { name: 'RandomGuy', discord: '' },
  ],
])

async function main() {
  const address: AddressLike = '0xbC37826f1e592e391AB8eA8c676540b3c63eEE0d'
  const creationBlock = await getCreationBlock(address)

  if (creationBlock === -1) {
    console.error('creation block not found for: ', address)
    return
  }

  const currBlock = Number(await client.getBlockNumber())
  const chunkSize = 500
  const ranges = splitRange(creationBlock, currBlock, chunkSize)
  const promises: any[] = []

  for (const r of ranges) {
    promises.push(await getContractLog(address, r[0], r[1]))
  }

  const logsArr = await Promise.all(promises)
  const sortedLogs = logsArr
    .filter((logs) => logs.length > 0)
    .flat()
    .sort((a, b) => (Number(a.blockNumber) > Number(b.blockNumber) ? 1 : -1))
    .sort((a, b) => (Number(a.logIndx) > Number(b.logIndx) ? 1 : -1))

  const table = []
  for (const i of sortedLogs) {
    const decodedLog = decodeEventLog({
      abi: BallotAbi as Abi,
      data: i['data'],
      topics: i['topics'],
    })
    const sender = (await client.getTransaction({ hash: i['transactionHash'] }))
      .from

    const alias = addressConfig.get(sender)?.name ?? sender

    table.push({
      sender: alias,
      event: decodedLog['eventName'],
      args: Object.entries(decodedLog['args']).map(
        ([key, value]) =>
          `${key}: ${addressConfig.get(value as AddressLike)?.name ?? value}`,
      ),
      txnHash: i['transactionHash'],
    })
  }

  const groupMemberList: {
    address: AddressLike
    name: string
    discordId: string
  }[] = []

  addressConfig.forEach((i, key) => {
    groupMemberList.push({
      address: key,
      name: i.name,
      discordId: i.discord,
    })
  })

  console.log('group member list:')
  console.table(groupMemberList)

  console.log(`\neventLogs for contract ${address}:`)
  console.table(table)
}

main()
