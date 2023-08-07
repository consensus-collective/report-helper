1. no flag

```
$ yarn report
Fetched all decoded logs. Done in 16.41397433400154 s.

Group member list:
┌─────────┬──────────────────────────────────────────────┬──────────┬───────────┐
│ (index) │                   address                    │   name   │ discordId │
├─────────┼──────────────────────────────────────────────┼──────────┼───────────┤
│    0    │ '0xb66c6d8d96faa683a4eb2cb4b854f7bb2295e01e' │ 'Alice'  │ 'haha123' │
│    1    │ '0xb66c6d8d96faa683a4eb2cb4b854f7bb2295e01f' │ 'Alice2' │ 'haha123' │
└─────────┴──────────────────────────────────────────────┴──────────┴───────────┘

EventLogs for contract 0x3975D8F35b9B805A3B05605F54ea6a615f2D4599:
┌─────────┬─────────┬─────────────────┬─────────────────────────────────────────────────────────┬──────────────────────────────────────────────────────────────────────┬────────┐
│ (index) │ sender  │      event      │                          args                           │                               txnHash                                │ logIdx │
├─────────┼─────────┼─────────────────┼─────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────────────────┼────────┤
│    0    │ 'Alice' │ 'GiveVoteRight' │ [ 'voter: 0xc6ffcA45d451f28754A81D10826f2ACDF171D9C5' ] │ '0xe12a7255da2275056462d21c1400e7a851f38c3eb2ea02affd12e4d470aee0ea' │  145   │
│    1    │ 'Alice' │ 'GiveVoteRight' │ [ 'voter: 0x265832C44f412013702761b9bC657CFBCd4cE69a' ] │ '0xe12a7255da2275056462d21c1400e7a851f38c3eb2ea02affd12e4d470aee0ea' │  146   │
│    2    │ 'Alice' │ 'GiveVoteRight' │ [ 'voter: 0x33Cb9c62131915C86DFfCb5C853379865Ae7379d' ] │ '0xe12a7255da2275056462d21c1400e7a851f38c3eb2ea02affd12e4d470aee0ea' │  147   │
│    3    │ 'Alice' │ 'GiveVoteRight' │ [ 'voter: 0x2F53eDad37fA7FC72E193d6d708065Bb9f38F4c2' ] │ '0xe12a7255da2275056462d21c1400e7a851f38c3eb2ea02affd12e4d470aee0ea' │  148   │
│    4    │ 'Alice' │ 'GiveVoteRight' │ [ 'voter: 0xD22C7a03d8a7f55916A1DF0ae3840B82B46216ae' ] │ '0xe12a7255da2275056462d21c1400e7a851f38c3eb2ea02affd12e4d470aee0ea' │  149   │
│    5    │ 'Alice' │     'Vote'      │           [ 'voter: Alice', 'proposalId: 1' ]           │ '0x85dd94ad360437bee6b84c1247175cb96b499b3b53d661ed3e0ccfc2cb50c51d' │  200   │
└─────────┴─────────┴─────────────────┴─────────────────────────────────────────────────────────┴──────────────────────────────────────────────────────────────────────┴────────┘

```

2. verbose

```
$ yarn report -v

$ npx ts-node src/index.ts -v
[2023-08-07 00:10:03]  Parsing config file...
[2023-08-07 00:10:03]  Reading file from src/config.json ...
[2023-08-07 00:10:03]  Parsing user config from config.json...
[2023-08-07 00:10:03]  Found 2 users.
[2023-08-07 00:10:03]  Parsing entries into a CaseInsensitiveMap...
[2023-08-07 00:10:03]  New entries added:  address: 0xb66c6d8d96faa683a4eb2cb4b854f7bb2295e01e , name: Alice , discordId: haha123
[2023-08-07 00:10:03]  New entries added:  address: 0xb66c6d8d96faa683a4eb2cb4b854f7bb2295e01f , name: Alice2 , discordId: haha123
[2023-08-07 00:10:03]  Connected to network: Sepolia url: https://gateway.tenderly.co/public/sepolia
[2023-08-07 00:10:03]  Getting creation block of contract 0x3975D8F35b9B805A3B05605F54ea6a615f2D4599
[2023-08-07 00:10:03]  Searching block: 2019907
[2023-08-07 00:10:04]  Searching block: 3029861
[2023-08-07 00:10:05]  Searching block: 3534838
[2023-08-07 00:10:05]  Searching block: 3787327
[2023-08-07 00:10:06]  Searching block: 3913571
[2023-08-07 00:10:06]  Searching block: 3976693
[2023-08-07 00:10:07]  Searching block: 4008254
[2023-08-07 00:10:07]  Searching block: 4024035
[2023-08-07 00:10:08]  Searching block: 4031925
[2023-08-07 00:10:08]  Searching block: 4035870
[2023-08-07 00:10:09]  Searching block: 4037843
[2023-08-07 00:10:09]  Searching block: 4038829
[2023-08-07 00:10:10]  Searching block: 4038336
[2023-08-07 00:10:11]  Searching block: 4038090
[2023-08-07 00:10:11]  Searching block: 4038213
[2023-08-07 00:10:12]  Searching block: 4038275
[2023-08-07 00:10:13]  Searching block: 4038306
[2023-08-07 00:10:13]  Searching block: 4038291
[2023-08-07 00:10:14]  Searching block: 4038283
[2023-08-07 00:10:14]  Searching block: 4038287
[2023-08-07 00:10:15]  Searching block: 4038285
[2023-08-07 00:10:16]  Searching block: 4038286
[2023-08-07 00:10:16]  Creation block found: 4038286
[2023-08-07 00:10:16]  Start fetching eventLogs from block 4038286 to 4039815
[2023-08-07 00:10:16]  Chunk size: 500, # of chunks: 4
[2023-08-07 00:10:16]  Getting eventLogs for 0x3975D8F35b9B805A3B05605F54ea6a615f2D4599: [4038286 , 4038786]
[2023-08-07 00:10:17]  Getting eventLogs for 0x3975D8F35b9B805A3B05605F54ea6a615f2D4599: [4038787 , 4039287]
[2023-08-07 00:10:17]  Getting eventLogs for 0x3975D8F35b9B805A3B05605F54ea6a615f2D4599: [4039288 , 4039788]
[2023-08-07 00:10:17]  Getting eventLogs for 0x3975D8F35b9B805A3B05605F54ea6a615f2D4599: [4039789 , 4039815]
[2023-08-07 00:10:18]  All eventLogs fetched. # of logs: 4
[2023-08-07 00:10:18]  Importing contract abi from ./abis/Ballot2.json...
[2023-08-07 00:10:18]  Decoding eventLog for txn: 0xe12a7255da2275056462d21c1400e7a851f38c3eb2ea02affd12e4d470aee0ea
[2023-08-07 00:10:18]  Decoding eventLog for txn: 0xe12a7255da2275056462d21c1400e7a851f38c3eb2ea02affd12e4d470aee0ea
[2023-08-07 00:10:18]  Decoding eventLog for txn: 0xe12a7255da2275056462d21c1400e7a851f38c3eb2ea02affd12e4d470aee0ea
[2023-08-07 00:10:19]  Decoding eventLog for txn: 0xe12a7255da2275056462d21c1400e7a851f38c3eb2ea02affd12e4d470aee0ea
[2023-08-07 00:10:19]  Decoding eventLog for txn: 0xe12a7255da2275056462d21c1400e7a851f38c3eb2ea02affd12e4d470aee0ea
[2023-08-07 00:10:19]  Decoding eventLog for txn: 0x85dd94ad360437bee6b84c1247175cb96b499b3b53d661ed3e0ccfc2cb50c51d
Fetched all decoded logs. Done in 16.172382874965667 s.

Group member list:
┌─────────┬──────────────────────────────────────────────┬──────────┬───────────┐
│ (index) │                   address                    │   name   │ discordId │
├─────────┼──────────────────────────────────────────────┼──────────┼───────────┤
│    0    │ '0xb66c6d8d96faa683a4eb2cb4b854f7bb2295e01e' │ 'Alice'  │ 'haha123' │
│    1    │ '0xb66c6d8d96faa683a4eb2cb4b854f7bb2295e01f' │ 'Alice2' │ 'haha123' │
└─────────┴──────────────────────────────────────────────┴──────────┴───────────┘

EventLogs for contract 0x3975D8F35b9B805A3B05605F54ea6a615f2D4599:
┌─────────┬─────────┬─────────────────┬─────────────────────────────────────────────────────────┬──────────────────────────────────────────────────────────────────────┬────────┐
│ (index) │ sender  │      event      │                          args                           │                               txnHash                                │ logIdx │
├─────────┼─────────┼─────────────────┼─────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────────────────┼────────┤
│    0    │ 'Alice' │ 'GiveVoteRight' │ [ 'voter: 0xc6ffcA45d451f28754A81D10826f2ACDF171D9C5' ] │ '0xe12a7255da2275056462d21c1400e7a851f38c3eb2ea02affd12e4d470aee0ea' │  145   │
│    1    │ 'Alice' │ 'GiveVoteRight' │ [ 'voter: 0x265832C44f412013702761b9bC657CFBCd4cE69a' ] │ '0xe12a7255da2275056462d21c1400e7a851f38c3eb2ea02affd12e4d470aee0ea' │  146   │
│    2    │ 'Alice' │ 'GiveVoteRight' │ [ 'voter: 0x33Cb9c62131915C86DFfCb5C853379865Ae7379d' ] │ '0xe12a7255da2275056462d21c1400e7a851f38c3eb2ea02affd12e4d470aee0ea' │  147   │
│    3    │ 'Alice' │ 'GiveVoteRight' │ [ 'voter: 0x2F53eDad37fA7FC72E193d6d708065Bb9f38F4c2' ] │ '0xe12a7255da2275056462d21c1400e7a851f38c3eb2ea02affd12e4d470aee0ea' │  148   │
│    4    │ 'Alice' │ 'GiveVoteRight' │ [ 'voter: 0xD22C7a03d8a7f55916A1DF0ae3840B82B46216ae' ] │ '0xe12a7255da2275056462d21c1400e7a851f38c3eb2ea02affd12e4d470aee0ea' │  149   │
│    5    │ 'Alice' │     'Vote'      │           [ 'voter: Alice', 'proposalId: 1' ]           │ '0x85dd94ad360437bee6b84c1247175cb96b499b3b53d661ed3e0ccfc2cb50c51d' │  200   │
└─────────┴─────────┴─────────────────┴─────────────────────────────────────────────────────────┴──────────────────────────────────────────────────────────────────────┴────────┘
✨  Done in 17.73s.
```

3. verbose w/ output

```
$ yarn report -v -o demo.txt

$ npx ts-node src/index.ts -v -o demo.txt
[2023-08-07 00:10:36]  Parsing config file...
[2023-08-07 00:10:36]  Reading file from src/config.json ...
[2023-08-07 00:10:36]  Parsing user config from config.json...
[2023-08-07 00:10:36]  Found 2 users.
[2023-08-07 00:10:36]  Parsing entries into a CaseInsensitiveMap...
[2023-08-07 00:10:36]  New entries added:  address: 0xb66c6d8d96faa683a4eb2cb4b854f7bb2295e01e , name: Alice , discordId: haha123
[2023-08-07 00:10:36]  New entries added:  address: 0xb66c6d8d96faa683a4eb2cb4b854f7bb2295e01f , name: Alice2 , discordId: haha123
[2023-08-07 00:10:36]  Connected to network: Sepolia url: https://gateway.tenderly.co/public/sepolia
[2023-08-07 00:10:36]  Getting creation block of contract 0x3975D8F35b9B805A3B05605F54ea6a615f2D4599
[2023-08-07 00:10:37]  Searching block: 2019908
[2023-08-07 00:10:37]  Searching block: 3029863
[2023-08-07 00:10:38]  Searching block: 3534840
[2023-08-07 00:10:38]  Searching block: 3787329
[2023-08-07 00:10:38]  Searching block: 3913573
[2023-08-07 00:10:39]  Searching block: 3976695
[2023-08-07 00:10:39]  Searching block: 4008256
[2023-08-07 00:10:39]  Searching block: 4024037
[2023-08-07 00:10:40]  Searching block: 4031927
[2023-08-07 00:10:41]  Searching block: 4035872
[2023-08-07 00:10:41]  Searching block: 4037845
[2023-08-07 00:10:42]  Searching block: 4038831
[2023-08-07 00:10:42]  Searching block: 4038338
[2023-08-07 00:10:43]  Searching block: 4038092
[2023-08-07 00:10:43]  Searching block: 4038215
[2023-08-07 00:10:44]  Searching block: 4038277
[2023-08-07 00:10:44]  Searching block: 4038308
[2023-08-07 00:10:45]  Searching block: 4038293
[2023-08-07 00:10:46]  Searching block: 4038285
[2023-08-07 00:10:46]  Searching block: 4038289
[2023-08-07 00:10:47]  Searching block: 4038287
[2023-08-07 00:10:48]  Searching block: 4038286
[2023-08-07 00:10:48]  Creation block found: 4038286
[2023-08-07 00:10:48]  Start fetching eventLogs from block 4038286 to 4039817
[2023-08-07 00:10:48]  Chunk size: 500, # of chunks: 4
[2023-08-07 00:10:48]  Getting eventLogs for 0x3975D8F35b9B805A3B05605F54ea6a615f2D4599: [4038286 , 4038786]
[2023-08-07 00:10:49]  Getting eventLogs for 0x3975D8F35b9B805A3B05605F54ea6a615f2D4599: [4038787 , 4039287]
[2023-08-07 00:10:49]  Getting eventLogs for 0x3975D8F35b9B805A3B05605F54ea6a615f2D4599: [4039288 , 4039788]
[2023-08-07 00:10:49]  Getting eventLogs for 0x3975D8F35b9B805A3B05605F54ea6a615f2D4599: [4039789 , 4039817]
[2023-08-07 00:10:49]  All eventLogs fetched. # of logs: 4
[2023-08-07 00:10:49]  Importing contract abi from ./abis/Ballot2.json...
[2023-08-07 00:10:49]  Decoding eventLog for txn: 0xe12a7255da2275056462d21c1400e7a851f38c3eb2ea02affd12e4d470aee0ea
[2023-08-07 00:10:50]  Decoding eventLog for txn: 0xe12a7255da2275056462d21c1400e7a851f38c3eb2ea02affd12e4d470aee0ea
[2023-08-07 00:10:50]  Decoding eventLog for txn: 0xe12a7255da2275056462d21c1400e7a851f38c3eb2ea02affd12e4d470aee0ea
[2023-08-07 00:10:50]  Decoding eventLog for txn: 0xe12a7255da2275056462d21c1400e7a851f38c3eb2ea02affd12e4d470aee0ea
[2023-08-07 00:10:50]  Decoding eventLog for txn: 0xe12a7255da2275056462d21c1400e7a851f38c3eb2ea02affd12e4d470aee0ea
[2023-08-07 00:10:51]  Decoding eventLog for txn: 0x85dd94ad360437bee6b84c1247175cb96b499b3b53d661ed3e0ccfc2cb50c51d
Fetched all decoded logs. Done in 14.70126854199171 s.

Group member list:
┌─────────┬──────────────────────────────────────────────┬──────────┬───────────┐
│ (index) │                   address                    │   name   │ discordId │
├─────────┼──────────────────────────────────────────────┼──────────┼───────────┤
│    0    │ '0xb66c6d8d96faa683a4eb2cb4b854f7bb2295e01e' │ 'Alice'  │ 'haha123' │
│    1    │ '0xb66c6d8d96faa683a4eb2cb4b854f7bb2295e01f' │ 'Alice2' │ 'haha123' │
└─────────┴──────────────────────────────────────────────┴──────────┴───────────┘

EventLogs for contract 0x3975D8F35b9B805A3B05605F54ea6a615f2D4599:
┌─────────┬─────────┬─────────────────┬─────────────────────────────────────────────────────────┬──────────────────────────────────────────────────────────────────────┬────────┐
│ (index) │ sender  │      event      │                          args                           │                               txnHash                                │ logIdx │
├─────────┼─────────┼─────────────────┼─────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────────────────┼────────┤
│    0    │ 'Alice' │ 'GiveVoteRight' │ [ 'voter: 0xc6ffcA45d451f28754A81D10826f2ACDF171D9C5' ] │ '0xe12a7255da2275056462d21c1400e7a851f38c3eb2ea02affd12e4d470aee0ea' │  145   │
│    1    │ 'Alice' │ 'GiveVoteRight' │ [ 'voter: 0x265832C44f412013702761b9bC657CFBCd4cE69a' ] │ '0xe12a7255da2275056462d21c1400e7a851f38c3eb2ea02affd12e4d470aee0ea' │  146   │
│    2    │ 'Alice' │ 'GiveVoteRight' │ [ 'voter: 0x33Cb9c62131915C86DFfCb5C853379865Ae7379d' ] │ '0xe12a7255da2275056462d21c1400e7a851f38c3eb2ea02affd12e4d470aee0ea' │  147   │
│    3    │ 'Alice' │ 'GiveVoteRight' │ [ 'voter: 0x2F53eDad37fA7FC72E193d6d708065Bb9f38F4c2' ] │ '0xe12a7255da2275056462d21c1400e7a851f38c3eb2ea02affd12e4d470aee0ea' │  148   │
│    4    │ 'Alice' │ 'GiveVoteRight' │ [ 'voter: 0xD22C7a03d8a7f55916A1DF0ae3840B82B46216ae' ] │ '0xe12a7255da2275056462d21c1400e7a851f38c3eb2ea02affd12e4d470aee0ea' │  149   │
│    5    │ 'Alice' │     'Vote'      │           [ 'voter: Alice', 'proposalId: 1' ]           │ '0x85dd94ad360437bee6b84c1247175cb96b499b3b53d661ed3e0ccfc2cb50c51d' │  200   │
└─────────┴─────────┴─────────────────┴─────────────────────────────────────────────────────────┴──────────────────────────────────────────────────────────────────────┴────────┘
[2023-08-07 00:10:51]  Table stored in demo.txt
✨  Done in 16.36s.
```

output: [demo.txt](demo.txt)
