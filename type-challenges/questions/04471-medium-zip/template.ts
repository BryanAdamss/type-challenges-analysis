/** 利用 infer 实现,参考:https://github.com/type-challenges/type-challenges/issues/4495 */
/** 知识点,因为不是联合类型,无法使用分布式特性 */
type Zip<A extends unknown[], B extends unknown[]> = [A, B] extends [
  [infer AF, ...infer AR],
  [infer BF, ...infer BR]
]
  ? [[AF, BF], ...Zip<AR, BR>]
  : []
