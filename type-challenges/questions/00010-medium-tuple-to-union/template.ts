/** https://github.com/type-challenges/type-challenges/issues/7 */
type TupleToUnion<T extends any[]> = T[number]

/** 或者 */
type TupleToUnion2<T> = T extends Array<infer ITEMS> ? ITEMS : never
