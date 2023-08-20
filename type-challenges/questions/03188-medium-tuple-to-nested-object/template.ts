/** 参考:https://github.com/type-challenges/type-challenges/issues/6733 */
type TupleToNestedObject<T extends unknown[], U> = T extends [
  infer F,
  ...infer R
]
  ? { [K in F & string]: TupleToNestedObject<R, U> }
  : U

/** 知识点,强制某个类型必须为 类型 A,否则原样返回,请用 T & A */
/** 参考:https://github.com/type-challenges/type-challenges/issues/6733#issuecomment-1136127999 */
type MustString<T> = T & string // string & T 结果也是一样
// 等价于
type MustStringEqual<T> = T extends string ? T : never

type AA = MustString<true> // never
type BBB = MustString<'hello'> // 'hello'
