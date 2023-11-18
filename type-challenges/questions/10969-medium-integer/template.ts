/** 思路:先转成字符串,再和 bigint 比较 */
/** 知识点,bingint 只能为整数https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt */
type Integer<T extends number> = `${T}` extends `${bigint}` ? T : never
