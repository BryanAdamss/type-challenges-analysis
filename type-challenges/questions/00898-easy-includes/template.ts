// 这种不够完善,不是严格相等
// type Includes<T extends readonly any[], U> = U extends T[number] ? true : false

/** 参考 https://github.com/microsoft/TypeScript/issues/27024#issuecomment-421529650 */
type MyEqual<T, U> = (<Z>() => Z extends T ? 1 : 2) extends <Z>() => Z extends U
  ? 1
  : 2
  ? true
  : false

type Includes<T extends readonly any[], U> = T extends [infer F, ...infer L]
  ? MyEqual<F, U> extends true
    ? true
    : Includes<L, U>
  : false
