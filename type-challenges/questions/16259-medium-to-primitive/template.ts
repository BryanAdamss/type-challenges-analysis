/** 思路:函数直接判断/对象递归遍历判断,基础类型用 valueOf 中的返回值确定 */
type ToPrimitive<T> = T extends object
  ? T extends (...args: any[]) => any
    ? Function
    : { [P in keyof T]: ToPrimitive<T[P]> }
  : T extends { valueOf: () => infer R }
  ? R
  : T

/** 知识点,ts中的 valueOf 可以返回类型值的原始类型 */
type a = 3
type b<T> = T extends { valueOf: () => infer R } ? R : T
type c = b<a> // number
