type Triangular<
  N extends number,
  /** 存放每次累加的数组 */
  Temp extends number[] = [],
  /** 最终结果数组 */
  Result extends number[] = []
> = Temp['length'] extends N
  ? Result['length']
  : Triangular<N, [0, ...Temp], [...Result, ...Temp, 0]>
