/** 解法1:借助 indexOf 判断数组中是否存在 */
type Unique<T extends unknown[], Arr extends unknown[] = []> = T extends [
  infer F,
  ...infer R
]
  ? IndexOf<Arr, F> extends -1
    ? Unique<R, [...Arr, F]>
    : Unique<R, [...Arr]>
  : Arr
