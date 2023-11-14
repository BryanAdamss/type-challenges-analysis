/** 解法1: https://github.com/type-challenges/type-challenges/issues/7225#issue-1163565758*/
type Join2<
  T extends unknown[],
  U extends string | number,
  Ret extends string = ''
> = T extends [infer First, ...infer Rest]
  ? Rest['length'] extends 0
    ? /** 知识点:通过&string 将 First 转为 string 类型 */ `${First & string}`
    : `${First & string}${U}${Join<Rest, U>}`
  : ''

/** 解法2:https://github.com/type-challenges/type-challenges/issues/7225#issuecomment-1539186165 */
type Join<T extends any[], U extends number | string> = T extends [
  /** 知识点:在infer 时用 extends 直接将 First 推断为 string */
  infer F extends string,
  ...infer R
]
  ? R['length'] extends 0
    ? `${F}`
    : `${F}${U}${Join<R, U>}`
  : ''
