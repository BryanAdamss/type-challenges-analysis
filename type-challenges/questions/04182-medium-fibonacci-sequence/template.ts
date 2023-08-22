/** 解法: https://github.com/type-challenges/type-challenges/issues/16384 */
type Fibonacci<
  T extends number,
  /** 斐波那契前2项都是固定的1, 从第3项开始 */
  Prev extends number[] = [1],
  Cur extends number[] = [1],
  Count extends number[] = [1, 1, 1]
> = T extends 1 | 2
  ? 1
  : /** 满足退出条件,返回长度*/ T extends Count['length']
  ? [...Prev, ...Cur]['length']
  : /** 不满足,则继续,调整 Prev 和 Cur值 已及 Count++ */
    Fibonacci<T, Cur, [...Prev, ...Cur], [...Count, 1]>
