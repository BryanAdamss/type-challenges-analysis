import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MyFlatten<[]>, []>>,
  Expect<Equal<MyFlatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<MyFlatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<MyFlatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<
    Equal<
      MyFlatten<[{ foo: 'bar'; 2: 10 }, 'foobar']>,
      [{ foo: 'bar'; 2: 10 }, 'foobar']
    >
  >
]

// @ts-expect-error
type error = MyFlatten<'1'>
