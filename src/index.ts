import { Abi, createPublicClient, http, decodeEventLog } from 'viem'
import { sepolia } from 'viem/chains'
import BallotAbi from './abis/Ballot2.json'
import { CaseInsensitiveMap, splitRange } from './misc'

const client = createPublicClient({
  chain: sepolia,
  transport: http('https://gateway.tenderly.co/public/sepolia'),
})

type ContractAddress = `0x${string}`

async function isContract(contractaddress: ContractAddress, block: number) {
  return (
    (await client.getBytecode({
      address: contractaddress,
      blockNumber: BigInt(block),
    })) !== undefined
  )
}

async function getCreationBlock(contractAddress: ContractAddress) {
  let start = 0
  let end = Number(await client.getBlockNumber())
  while (start <= end) {
    const mid = Math.ceil((start + end) / 2)
    const createdPrevBlock = await isContract(contractAddress, mid - 1)
    const createdThisBlock = await isContract(contractAddress, mid)

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
  contractAddress: ContractAddress,
  startBlock: number,
  endBlock: number,
) {
  return await client.getLogs({
    address: contractAddress,
    fromBlock: BigInt(startBlock),
    toBlock: BigInt(endBlock),
  })
}

let contractAlias = new CaseInsensitiveMap<ContractAddress, string>([
  ['0xb66c6d8d96faa683a4eb2cb4b854f7bb2295e01e', 'Alice'],
  ['0x1E2cD78882b12d3954a049Fd82FFD691565dC0A5', 'RandomGuy1'],
  ['0xb66c6D8d96fAa683A4eb2Cb4b854f7bB2295e01E', 'RandomGuy2'],
])

async function main() {
  const address: ContractAddress = '0xbC37826f1e592e391AB8eA8c676540b3c63eEE0d'
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

  const table = []
  for (const i of sortedLogs) {
    const decodedLog = decodeEventLog({
      abi: BallotAbi as Abi,
      data: i['data'],
      topics: i['topics'],
    })
    const sender = await (
      await client.getTransaction({ hash: i['transactionHash'] })
    ).from

    const alias = contractAlias.get(sender) ?? sender

    table.push({
      sender: alias,
      event: decodedLog['eventName'],
      args: decodedLog['args'],
      txnHash: i['transactionHash'],
    })
  }

  console.table(table)
}

main()
