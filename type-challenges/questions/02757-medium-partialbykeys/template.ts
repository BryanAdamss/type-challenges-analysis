/** 知识点,交叉类型和最终的对象类型不同,可以通过遍历进行转化(展开) */
/** 参考:https://github.com/type-challenges/type-challenges/issues/5395#issuecomment-1665278632 */

/** 方法1:简化版展开 */
type IntersectionObj<T> = {
  [P in keyof T]: T[P]
}
/**
 * 方法2:递归深层展开,Expand a type recusively. Makes types much nicer on hover ooooft
 */
type ExpandRecursively<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: ExpandRecursively<O[K]> }
    : never
  : T

/** 方法3:使用 Omit<T,never> */
/** 参考:https://github.com/type-challenges/type-challenges/issues/5395#issuecomment-1665278632 */
type BB = Omit<{ test: 3 } & { name: 4 }, never>

type PartialByKeys<T, K extends keyof T = keyof T> = ExpandRecursively<
  {
    [P in Exclude<keyof T, K>]: T[P]
  } & {
    [P in K]+?: T[P]
  }
>
