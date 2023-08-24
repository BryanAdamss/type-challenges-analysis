/** 参考:https://github.com/type-challenges/type-challenges/issues/16479 */
type Chunk<
  T extends unknown[],
  U extends number,
  /** 中间状态的单独 chunk */
  SingleChunk extends unknown[] = [],
  /** 最终数组 */
  Ret extends unknown[] = []
> = T extends [infer F, ...infer R]
  ? SingleChunk['length'] extends U
    ? Chunk<R, U, [F], [...Ret, SingleChunk]>
    : Chunk<R, U, [...SingleChunk, F], Ret>
  : /** 兼容T 为[]场景*/ SingleChunk['length'] extends 0
  ? Ret
  : [...Ret, SingleChunk]
