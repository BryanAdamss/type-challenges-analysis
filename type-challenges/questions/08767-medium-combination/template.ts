/** 解法:https://github.com/type-challenges/type-challenges/issues/14157 */
type Combination<
  T extends string[],
  All = T[number],
  Item = All
> = /** 重新将 Item 推断为 string,否则会报类型错误*/ Item extends infer I extends string
  ? I | `${I} ${Combination<[], Exclude<All, I>>}`
  : never
