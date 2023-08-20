/** 符合这种模式,即视为是以 U 开头 */
type MyStartsWith<
  T extends string,
  U extends string
> = T extends `${U}${infer R}` ? true : false

/** 官方解法:https://github.com/type-challenges/type-challenges/issues/2690 */
/** 知识点,模板字符串匹配时,可不用 infer 接收,用string表明后面是 string 即可 */
type StartsWith<T extends string, U extends string> = T extends `${U}${string}`
  ? true
  : false
