type Combs<T extends string[]> = T extends [
  /** 知识点,infer 推断时可用 extends 约束为特定类型 */ infer F extends string,
  ...infer R extends string[]
]
  ? `${F} ${R[number]}` | Combs<R>
  : never
