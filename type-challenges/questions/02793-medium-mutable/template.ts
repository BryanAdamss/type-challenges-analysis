/** 参考:https://github.com/type-challenges/type-challenges/issues/2795#issue-975416989 */
/** 知识点,可有减号在一些操作符号前进行删除操作 https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#example-5 */
/** 知识点,所有 ts 版本改动,可参考:https://github.com/Microsoft/TypeScript/wiki/What%27s-new-in-TypeScript#improved-control-over-mapped-type-modifiers */
type Mutable<T extends object> = {
  -readonly [K in keyof T]: T[K]
}
