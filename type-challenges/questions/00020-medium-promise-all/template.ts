/** https://github.com/type-challenges/type-challenges/issues/211#issuecomment-1528824194 */

declare function PromiseAll<T extends unknown[] /** 支持 case4 */>(
  values: readonly [...T] /** 获取 T 类型 */
): Promise<{
  [K in keyof T]: Awaited<T[K]> /** 对嵌套的 Promise 做类型提取 */
}>
