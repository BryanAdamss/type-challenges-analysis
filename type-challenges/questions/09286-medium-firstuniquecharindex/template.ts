/** 解法:https://github.com/type-challenges/type-challenges/issues/20488 */
type FirstUniqueCharIndex<
  T extends string,
  Index extends any[] = []
> = T extends ''
  ? -1
  : /** 依次取出每个字符 */ T extends `${infer F}${infer Rest}`
  ? F extends Index[number]
    ? /** Index 能找到F,说明重复,找后面的 */ FirstUniqueCharIndex<
        Rest,
        [...Index, F]
      >
    : /** F 在Index 未找到,继续判断 Rest 中是否存在 F */ Rest extends `${string}${F}${string}`
    ? /** Rest 中存在 F,继续往后查找 */ FirstUniqueCharIndex<
        Rest,
        [...Index, F]
      >
    : /** Rest 中不存在 F,说明 F 未重复,此时取出 Index 长度即可 */ Index['length']
  : -1
