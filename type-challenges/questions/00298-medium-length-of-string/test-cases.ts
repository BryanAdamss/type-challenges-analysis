import type { Equal, Expect } from '@type-challenges/utils'

type A = LengthOfString1<'hello'>

type cases = [
  Expect<Equal<LengthOfString1<''>, 0>>,
  Expect<Equal<LengthOfString1<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString1<'reina'>, 5>>,
  Expect<Equal<LengthOfString1<'Sound! Euphonium'>, 16>>
]
