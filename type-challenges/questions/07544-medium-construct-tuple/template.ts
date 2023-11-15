/** 解法1,遇到数字想到构造数组取length来表示 */
type ConstructTuple<
  L extends number,
  Ret extends unknown[] = []
> = Ret['length'] extends L ? Ret : ConstructTuple<L, [...Ret, unknown]>
