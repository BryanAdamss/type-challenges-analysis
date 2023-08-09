type LengthOfString1<
  S extends string,
  T extends string[] = [] /** 知识点1,设置临时变量存储数组,默认为[] */
> = S extends `${infer F}${infer R}`
  ? LengthOfString1<R, [...T, F]> /** 知识点2,利用[...T,F]向数组添加元素 */
  : T['length'] /** 知识点3,通过将字符转为数组,获取 length 获取长度 */
