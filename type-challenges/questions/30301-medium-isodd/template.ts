/** 思路:判断最后一位数是否特定值即可 */
type IsOdd<T extends number> = `${T}` extends `${number | ''}${
  | 1
  | 3
  | 5
  | 7
  | 9}`
  ? true
  : false
