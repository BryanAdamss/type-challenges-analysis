/** 知识点,遇到数字相关通通用数组长度来代替 */
type IndexOf<T extends unknown[], U, Count extends 1[] = []> = T extends [
  infer First,
  ...infer Rest
]
  ? MyEqual<U, First> extends true
    ? Count['length']
    : IndexOf<Rest, U, [...Count, 1]>
  : -1
