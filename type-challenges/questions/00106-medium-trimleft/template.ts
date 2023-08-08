/** ts 中也可以使用模板字符串 */

type Space = `\n` | '\t' | ' '

type TrimLeft<S extends string> = S extends `${Space}${infer R}`
  ? TrimLeft<R>
  : S
