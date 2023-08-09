/** 答案:https://github.com/type-challenges/type-challenges/issues/614 */
/** 解析:https://juejin.cn/post/7165170011282079751 */
type Permutation<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation<Exclude<T, K>>]
  : never

/** 知识点1:判断 泛型 T 是否 never 的固定范式 */
type MyIsNever<T> = [T] extends [never] ? true : false

// 为何不能用 T extends never
type MyIsNever2<T> = T extends never ? true : false
type A = MyIsNever2<'str'> //str
type B = MyIsNever2<never> // never  MyIsNever2<never> 中的 never 实际上是一个空的联合类型，一项都没有，所以 T extends ... 过程实际上被整体跳过了，所以最后的结果就是 never。

/** 知识点2:遍历联合类型的范式,extends 自身即可 */
type MyItrUnion<T> = T extends T ? [T] : never
/** 知识点3:运用了分布式条件类型:在 条件类型 中使用 泛型参数 时，如果泛型参数是 联合类型，则会产生 distributive 的效果。 */
/** https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types */
// 'A'|'B' extends 'A'|'B'=>
// 'A' extends 'A'|'B'=> ['A']
// 'B' extends 'A'|'B'=> ['B']
// => ['A']|['B']
type C = MyItrUnion<'A' | 'B'> // ['A'] | ['B']

/** 知识点4:解构元组的联合时的 distributive 效果 */
type D = [1, 2] | [3, 4]
type E = ['a', 'b'] | ['c', 'd']

type F = [true, ...D, ...E]
// [true, 1, 2, "a", "b"] | [true, 1, 2, "c", "d"] | [true, 3, 4, "a", "b"] | [true, 3, 4, "c", "d"]
