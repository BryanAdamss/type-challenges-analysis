/** 思路:递归遍历判断 */
type Filter<T extends any[], P> = T extends [infer F, ...infer R]
  ? F extends P
    ? [F, ...Filter<R, P>]
    : [...Filter<R, P>]
  : []
