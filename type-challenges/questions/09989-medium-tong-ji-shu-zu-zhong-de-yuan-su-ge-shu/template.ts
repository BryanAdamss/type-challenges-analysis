/** 解法:https://wangtunan.github.io/blog/typescript/challenge.html#countarrayelement-%E8%AE%A1%E6%95%B0%E6%95%B0%E7%BB%84%E4%B8%AD%E5%85%83%E7%B4%A0%E5%87%BA%E7%8E%B0%E7%9A%84%E6%AC%A1%E6%95%B0 */
type Flatten<T, R extends any[] = []> = T extends [infer F, ...infer L]
  ? [F] extends [never]
    ? Flatten<L, R>
    : F extends any[]
    ? Flatten<L, [...R, ...Flatten<F>]>
    : Flatten<L, [...R, F]>
  : R

type Count<
  T,
  /** 记录结果的字典,用来统计数量 */ R extends Record<
    string | number,
    any[]
  > = {}
> = T extends [
  /** 知识点,推断要求推断符合某个类型 */
  infer F extends string | number,
  ...infer L
]
  ? /** 如果当前数组的遍历项是R对象中的一个键，则表明需要计数加一；如果不是，则代表是新项，需要计数为1； */ F extends keyof R
    ? Count<
        L,
        /** 保留除 F 以外的值,并给 F 计数+1 */
        Omit<R, F> & Record<F, [...R[F], 0]>
      >
    : Count<L, R & Record<F, [0]>>
  : /** 因为最后结果需要返回对象，而非数组，所以迭代R对象，返回其每个属性的数组长度即可 */ {
      [K in keyof R]: R[K]['length']
    }

type CountElementNumberToObject<T> = Count<Flatten<T>>
