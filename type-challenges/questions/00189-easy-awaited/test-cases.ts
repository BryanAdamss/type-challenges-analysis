import type { Equal, Expect } from '@type-challenges/utils'

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>
type ZZ = Promise<Promise<Promise<string | symbol>>>
type ZZZ = Promise<Promise<Promise<Promise<string | symbol>>>>

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<ZZ>, string | symbol>>,
  Expect<Equal<MyAwaited<ZZZ>, string | symbol>>
]

// @ts-expect-error
type error = MyAwaited<number>
