/** 第一种,无法通过 2,3case*/
/** 参考:https://github.com/type-challenges/type-challenges/issues/3542 */
type RemoveIndexSignature2<Type> = {
  /** 知识点,通过 as 进行 key-remapping ,在key-remapping 中可以用 extends ,infer等 */
  /** 常用在对象 key 遍历时,对 key 重新映射,示例1 */
  /** 文档:https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as */
  [Key in keyof Type as Key extends `${infer ConcreteKey}`
    ? ConcreteKey
    : never]: Type[Key]
}

/** 示例1 */
type EventConfig<Events extends { kind: string }> = {
  /** 遍历Events并取 E['kind']做 key 名 */
  [E in Events as E['kind']]: (event: E) => void
}

type SquareEvent = { kind: 'square'; x: number; y: number }
type CircleEvent = { kind: 'circle'; radius: number }

type Config = EventConfig<SquareEvent | CircleEvent>

/** 第二种,参考https://github.com/type-challenges/type-challenges/issues/14662 */
/** 知识点,PropertyKey是ts 中的global type,等价于string | number | symbol */
type RemoveIndexSignature<T, P = PropertyKey> = {
  /** 遍历T获得 key 并 re-mapping */
  /** 知识点:index-signature 的取类型是 string | number | symbol */
  /** 参考:https://www.totaltypescript.com/concepts/propertykey-type */
  /** 如果 P(string | number | symbol) 是 Key 的子集,则说明是 index-signature,则剔除  */
  [Key in keyof T as P extends Key
    ? never
    : /** 如果 Key 是 P的子集,则说明是需要保留的 Key */
    Key extends P
    ? Key
    : never]: T[Key]
}
