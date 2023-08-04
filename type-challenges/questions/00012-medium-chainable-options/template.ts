type Chainable</** 泛型 T当临时存储的变量用,默认为{}*/ T = {}> = {
  option: <K extends string, V>(
    key: K extends keyof T ? never : K /** 限制重复 key 名 */,
    value: V
  ) => /** 返回新增Record<K,V>的 Chainable 对象 */ Chainable<
    Omit<T, K> & Record<K, V>
  >
  get: () => T
}
