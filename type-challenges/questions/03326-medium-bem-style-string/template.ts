/** 我的解法 */
type MyBEM<
  B extends string,
  E extends string[],
  M extends string[]
> = E extends []
  ? `${B}--${M[number]}`
  : M extends []
  ? `${B}__${E[number]}`
  : `${B}__${E[number]}--${M[number]}`

/** 官方解法 */
type IsNever2<T> = [T] extends [never] ? true : false
type IsUnion2<U> = IsNever<U> extends true ? '' : U
type BEM<
  B extends string,
  E extends string[],
  M extends string[]
> = `${B}${IsUnion2<`__${E[number]}`>}${IsUnion2<`--${M[number]}`>}`
