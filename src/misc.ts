import * as fs from 'fs'
import log from './logger'
import { Abi } from 'viem'

export async function readFile(path: string): Promise<string> {
  log.debug(`Reading file from ${path} ...`)
  return new Promise((resolve) => {
    fs.readFile(path, 'utf-8', (err, content) => {
      resolve(content)
    })
  })
}

export async function writeFile(path: string, text: string): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new Promise((resolve, reject: any) => {
    fs.writeFile(path, text, (err) => {
      if (err) reject(err)
      resolve()
    })
  })
}

export class CaseInsensitiveMap<T, U> extends Map<T, U> {
  set(key: T, value: U): this {
    if (typeof key === 'string') {
      key = key.toLowerCase() as any as T
    }
    return super.set(key, value)
  }

  get(key: T): U | undefined {
    if (typeof key === 'string') {
      key = key.toLowerCase() as any as T
    }

    return super.get(key)
  }

  has(key: T): boolean {
    if (typeof key === 'string') {
      key = key.toLowerCase() as any as T
    }

    return super.has(key)
  }
}

export function splitRange(start: number, end: number, range: number) {
  let arr = []
  while (start <= end) {
    const u = [start, start + range >= end ? end : start + range]
    arr.push(u)
    start += range + 1
  }
  return arr
}

export async function importAbi(path: string): Promise<Abi> {
  const abi = await import(path)
  return abi['default'] as Abi
}
