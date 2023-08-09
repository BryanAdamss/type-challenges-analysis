/**  使用&会报错 */
// Equal<{name: 'john', age: 100}, {name: 'john', age: 100}> // => true
// Equal<{name: 'john', age: 100}, {name: 'john'} & {age: 100}> // => false
// type MyAppendToObject<
//   T extends object,
//   U extends string | number | symbol,
//   V extends unknown
// > = {
//   [K in keyof T]: T[K]
// } & { [K in U]: V }

type AppendToObject<
  T extends object,
  K extends string | number | symbol,
  V extends unknown
> = {
  /** 知识点,在对象中遍历 key 时用 keyof+in 组合 */
  [P in keyof T | K]: P extends keyof T ? T[P] : V
}
