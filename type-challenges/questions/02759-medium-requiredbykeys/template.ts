/** 我的解法1,无法通过 */
type MyRequiredByKeys<T, Keys extends keyof T = keyof T> = IntersectionObj<
  {
    [K in Keys]-?: T[K]
  } & {
    /** 这里因为重新构造了类型,将原本可选的值也会转换为必选,无法保留之前的可选特性,可有 Pick 替代 */
    [K in Exclude<keyof T, Keys>]: T[K]
  }
>

/** 我的解法2,用 Pick */
type MyRequiredByKeys2<T, Keys extends keyof T = keyof T> = IntersectionObj<
  {
    [K in Keys]-?: T[K]
  } & Pick<T, Exclude<keyof T, Keys>>
>

/** 官方解法:https://github.com/type-challenges/type-challenges/issues/8405#issuecomment-1585480204 */
/** Omit<Result,never>是将交叉类型展开,见02757-medium-partialbykeys */
type RequiredByKeys<T, K extends keyof T = keyof T> = Omit<
  T & Required<Pick<T, K & keyof T>>,
  never
>
