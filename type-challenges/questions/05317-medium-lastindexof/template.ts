/** 解法:https://github.com/type-challenges/type-challenges/issues/5330#issuecomment-1506602140 */
type LastIndexOf<T extends unknown[], U> = T extends [
  /** 知识点:从后往前遍历数组 */
  ...infer Rest,
  infer Last
]
  ? MyEqual<Last, U> extends true
    ? /** 知识点:用前面数组的 length 代表当前元素索引 */
      Rest['length']
    : LastIndexOf<Rest, U>
  : -1
