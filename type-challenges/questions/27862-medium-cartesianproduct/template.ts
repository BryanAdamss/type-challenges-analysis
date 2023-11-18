/** 思路: 当成双重循环做 */
type CartesianProduct<T, U> = T extends T
  ? U extends U
    ? [T, U]
    : never
  : never
