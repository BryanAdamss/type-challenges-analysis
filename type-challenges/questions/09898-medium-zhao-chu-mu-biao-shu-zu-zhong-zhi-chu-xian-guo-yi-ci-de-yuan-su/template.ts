/** 解法:https://github.com/type-challenges/type-challenges/issues/28152 */
type FindEles<
  T extends any[],
  /** 存结果 */
  U extends any[] = [],
  /** 存计算过的数 */
  O extends any[] = []
> = T extends [infer F, ...infer Rest]
  ? F extends [...Rest, ...O][number]
    ? /** F在数组中出现过,则继续找 */ FindEles<Rest, U, [...O, F]>
    : /** F在数组中未出现过,则保存到U 中,继续找*/ FindEles<
        Rest,
        [...U, F],
        [...O, F]
      >
  : U
