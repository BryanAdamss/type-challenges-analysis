/** 思路, */
type GetMiddleElement<T extends any[]> =
  /** 若数组长度为0/1/2,则中位数就是自身 */ T['length'] extends 0 | 1 | 2
    ? T
    : /** 超过2,则每次去掉头尾,最终留下的就是中位数 */ T extends [
        any,
        ...infer Middle,
        any
      ]
    ? GetMiddleElement<Middle>
    : never
