/** 利用 infer + ...实现顺序交换 */
type Reverse<T extends unknown[]> = T extends [infer F, ...infer R]
  ? [...Reverse<R>, F]
  : T
