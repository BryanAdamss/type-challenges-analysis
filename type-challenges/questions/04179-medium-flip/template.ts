/** 解法:https://github.com/type-challenges/type-challenges/issues/14094 */
type Flip<T extends Record<string, string | number | boolean>> = {
  /** 知识点,通过模板字符串,将 boolean 转换为 string 做为key 用 */
  [P in keyof T as `${T[P]}`]: P
}
