/** 我的实现,无法通过 case */
type MyDeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends {} ? DeepReadonly<T[K]> : T[K]
}

/** 参考 https://github.com/type-challenges/type-challenges/issues/187 */
/** 1. nice set up of the base case: recursion stops if T is no longer an object */
/** 2. nice definition of the recursive cases: the value T[k] is always define recursively. */
type DeepReadonly<T> = keyof T extends never
  ? T
  : { readonly [k in keyof T]: DeepReadonly<T[k]> }
