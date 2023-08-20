/** 利用infer+...做截取 */
type Shift<T extends unknown[]> = T extends [unknown, ...infer Rest] ? Rest : []
