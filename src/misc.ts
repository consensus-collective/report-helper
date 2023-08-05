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
