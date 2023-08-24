/** 知识点,数组转 union */
type ToUnion<T> = T extends any[] ? T[number] : T

/** 参考:https://github.com/type-challenges/type-challenges/issues/14118 */
type Without<T, U> = T extends [infer R, ...infer F]
  ? R extends ToUnion<U>
    ? Without<F, U>
    : [R, ...Without<F, U>]
  : T
