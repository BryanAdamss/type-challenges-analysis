type OmitByType<T, U> = {
  [Key in keyof T as T[Key] extends U ? never : Key]: T[Key]
}
