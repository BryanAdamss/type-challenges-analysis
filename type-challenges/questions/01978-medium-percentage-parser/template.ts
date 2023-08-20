type CheckSign<Sign> = Sign extends '+' | '-' ? Sign : never

/** 知识点,模板字符串+infer 可实现类似正则匹配效果 */
type CheckPercentageSign<S> = S extends `${infer N}%` ? [N, '%'] : [S, '']

type PercentageParser<A extends string> = A extends `${CheckSign<
  /** 知识点,infer的类型可当参数传递 */
  infer L
>}${infer R}`
  ? [L, ...CheckPercentageSign<R>]
  : ['', ...CheckPercentageSign<A>]
