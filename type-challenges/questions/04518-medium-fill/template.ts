/** 参考:https://github.com/type-challenges/type-challenges/issues/14102 */
type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  /** 用来做递归计数用,当Count['length']等于 Start 开始替换,等于 End 结束替换 */
  Count extends unknown[] = [],
  /** 是否需要替换标记 */
  Flag extends boolean = Count['length'] extends Start ? true : false
> = /** 结束则返回 */ Count['length'] extends End
  ? T
  : T extends [infer F, ...infer Rest]
  ? Flag extends false
    ? /** 无需替换 */ [F, ...Fill<Rest, N, Start, End, [...Count, 1]>]
    : /** 需要替换 */ [
        /** 替换 */ N,
        ...Fill<
          Rest,
          N,
          Start,
          End,
          [...Count, 1],
          /** 传递替换标记,否则下个递归会重置为 false */ Flag
        >
      ]
  : T
