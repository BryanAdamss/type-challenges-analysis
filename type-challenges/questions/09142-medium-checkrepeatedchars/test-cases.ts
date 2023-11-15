type CheckRepeatedChars<T extends string> = T extends `${infer F}${infer R}`
  ? /** 知识点 string 在模板字符串中能匹配任意数量字符,类似正则中的星号 */
    R extends `${string}${F}${string}`
    ? true
    : CheckRepeatedChars<R>
  : false
