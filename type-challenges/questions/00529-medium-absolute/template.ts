type Absolute<T extends number | string | bigint> =
  `${T}` extends `-${infer R}` /** 知识点,使用字符串模板将 number 转为string */
    ? R
    : `${T}`

type AB = -1_000_000n
type BC = `${AB}` // "-1000000"
