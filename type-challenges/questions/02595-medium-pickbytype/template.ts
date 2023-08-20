type PickByType<T, U> = {
  /** 使用as结合 extends进行过滤 key */
  [Key in keyof T as T[Key] extends U ? Key : never]: T[Key]
}
