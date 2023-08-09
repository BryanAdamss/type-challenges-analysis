/** 这种会报错,没有判断 P 是否存在 F 中 */
// type MyMerge<F extends object, S extends object> = {
//   [P in keyof F | keyof S]: P extends keyof S ? S[P] : F[P] // Type 'P' cannot be used to index type 'F'. why?
// }

type Merge<F extends object, S extends object> = {
  [P in keyof F | keyof S]: P extends keyof S
    ? S[P]
    : P extends keyof F
    ? F[P]
    : never
}

/** 另外方案 */
type Merge2<F, S> = Omit<F, keyof S> & S
