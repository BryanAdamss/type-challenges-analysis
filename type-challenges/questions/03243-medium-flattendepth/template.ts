/** 解法: https://github.com/type-challenges/type-challenges/issues/15373*/
type FlattenDepth<
  T extends unknown[],
  K extends number = 1,
  U extends unknown[] = []
> = /** 知识点,使用数组长度计数比较 */ U['length'] extends K
  ? T
  : T extends [infer F, ...infer R]
  ? F extends unknown[]
    ? [
        /** 知识点,使用...运算符打平数组 */ ...FlattenDepth<
          F,
          K,
          /** 知识点,使用...运算符结构并元素+1 */ [...U, 1]
        >,
        ...FlattenDepth<R, K, U>
      ]
    : [F, ...FlattenDepth<R, K, U>]
  : T
