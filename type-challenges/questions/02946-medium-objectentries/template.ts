/** 知识点,对象转联合,用 T[keyof T] */
type ObjectToUnion<T> = T[keyof T]

/** 知识点,数组转联合类型用下标*/
// ['1', '2']['number'] // '1' | '2'

/** 参考:https://github.com/type-challenges/type-challenges/issues/14052 */
type ObjectEntries<T> = {
  [Key in keyof T]: [Key, T[Key]]
}[keyof T]
