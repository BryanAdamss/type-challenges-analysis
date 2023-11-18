type DeepOmit<T, Keys> = {
  [K in keyof T as K extends Keys ? never : K]: K extends Keys
    ? never
    : Keys extends `${infer F}.${infer R}`
    ? K extends F
      ? DeepOmit<T[K], R>
      : T[K]
    : T[K]
}
