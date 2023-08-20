/** 我的解法 */
type DropChar2<
  S extends string,
  C extends string
> = S extends `${infer F}${infer R}`
  ? F extends C
    ? `${DropChar<R, C>}`
    : `${F}${DropChar<R, C>}`
  : S

/** 标准答案,利用了 infer+模板字符串能实现正则匹配的原理 */
type DropChar<S, C extends string> = S extends `${infer L}${C}${infer R}`
  ? DropChar<`${L}${R}`, C>
  : S
