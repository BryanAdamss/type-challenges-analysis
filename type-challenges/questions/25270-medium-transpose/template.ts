/** 解法:https://github.com/type-challenges/type-challenges/issues/28364 */
type Temp<M extends number[][], I extends number> = M extends [
  infer F extends number[],
  ...infer Res extends number[][]
]
  ? [F[I], ...Temp<Res, I>]
  : []

type Transpose<M extends number[][], Res extends number[][] = []> = M extends [
  infer F extends number[],
  ...any
]
  ? F['length'] extends Res['length']
    ? []
    : [Temp<M, Res['length']>, ...Transpose<M, [...Res, any]>]
  : []
