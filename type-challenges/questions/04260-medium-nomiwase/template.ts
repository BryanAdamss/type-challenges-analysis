/** 知识点,利用 infer + | 将字符串转换为联合类型,"AB"->""|"A"|"B" */
type StringToUnion2<S> = S extends `${infer F}${infer R}`
  ? F | StringToUnion2<R>
  : S

/** 解法:https://github.com/type-challenges/type-challenges/issues/16430 */
type AllCombinations<
  S extends string,
  T extends string = StringToUnion2<S>,
  U extends string = T
> = S extends `${infer F}${infer R}`
  ? /** 遍历联合类型 U */ U extends U
    ? `${U}${AllCombinations<R, U extends '' ? T : Exclude<T, U>>}`
    : never
  : ''
