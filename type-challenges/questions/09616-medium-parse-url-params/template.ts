/** 解法:https://github.com/type-challenges/type-challenges/issues/30353 */
type ParseUrlParams<T extends string> =
  T extends /** 先按:切割 */ `${string}:${infer Param}`
    ? Param extends /** 再按/切割 */ `${infer Left}/${infer Right}`
      ? Left | ParseUrlParams<Right>
      : Param
    : never
