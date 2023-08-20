/** 解法1,由于递归限制,无法通过最后一个 case */
/** 知识点,ts 中的数值运算通过构造数组,然后通过 length 得出,这种在数字较小时计算可用(数字大了,ts 有限制递归次数) */
type MyMinusOne<
  T extends number,
  TempArr extends unknown[] = []
> = T extends TempArr['length']
  ? TempArr extends [infer F, ...infer R]
    ? R['length']
    : never
  : MyMinusOne<T, [0, ...TempArr]>

/** 解法2: https://github.com/type-challenges/type-challenges/issues/13507 适用v4.8.0+*/
/** 知识点,字符转数字,https://devblogs.microsoft.com/typescript/announcing-typescript-4-8-beta/#improved-inference-for-infer-types-in-template-string-types */
type ParseInt<T extends string> = T extends `${infer Digit extends number}`
  ? Digit
  : never
type ReverseString<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${ReverseString<Rest>}${First}`
  : ''
type RemoveLeadingZeros<S extends string> = S extends '0'
  ? S
  : S extends `${'0'}${infer R}`
  ? RemoveLeadingZeros<R>
  : S
type InternalMinusOne<S extends string> =
  S extends `${infer Digit extends number}${infer Rest}`
    ? Digit extends 0
      ? `9${InternalMinusOne<Rest>}`
      : `${[9, 0, 1, 2, 3, 4, 5, 6, 7, 8][Digit]}${Rest}`
    : never
type MinusOne<T extends number> = ParseInt<
  RemoveLeadingZeros<ReverseString<InternalMinusOne<ReverseString<`${T}`>>>>
>
type test = MinusOne<9007199254740992>
