/** ...类似数组的扩展运算符使用即可 */
type Push<T extends any[], U> = [...T, U]
