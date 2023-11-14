/** 解法: https://github.com/type-challenges/type-challenges/issues/14152#issue-1330929383*/
type MapTypes2<T, R extends { mapFrom: unknown; mapTo: unknown }> = {
  [K in keyof T]: T[K] extends R['mapFrom']
    ? R extends { mapFrom: T[K] }
      ? R['mapTo']
      : never
    : T[K]
}

/** 解法2 */
type GetMapType<
  ValueType,
  R,
  /** 判断是否符合转换map要求,并获取到 mapTo 类型 */
  Type = R extends { mapFrom: ValueType; mapTo: infer To } ? To : never
> = /** mapTo 不是 never,就 mapTo 类型,否则用原类型 */ [Type] extends [never]
  ? ValueType
  : Type

type MapTypes<T, R> = {
  [P in keyof T]: GetMapType<T[P], R>
}
