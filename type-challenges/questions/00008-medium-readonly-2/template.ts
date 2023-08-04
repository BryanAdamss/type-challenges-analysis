/** K extends keyof T = keyof T：如要传递了K，那么只能是T中已经存在的属性，不存在则报错；如果不传递，则默认值为keyof T，意味着全部属性都添加readonly */
/** 取忽略K 后的类型& 只读的只挑选了K的类型 */
type MyReadonly2<T, K extends keyof T = keyof T> = MyOmit<T, K> &
  MyReadonly<MyPick<T, K>>

/** 网上实现方式 */
// ts v4.4+版本可直接用
type MyReadonly23<T, K extends keyof T = keyof T> = T & {
  readonly [P in K]: T[P]
}
// ts v4.5+版本必须用
type MyReadonly24<T, K extends keyof T = keyof T> = Omit<T, K> & {
  readonly [P in K]: T[P]
}
