/** 知识点,通过模板字符串可以直接将 number 转换为字符串类型 */
type Trunc<S extends string | number> = `${S}` extends `${infer R}.${infer U}`
  ? R extends ''
    ? '0'
    : R
  : `${S}`
