type StringToUnion<T extends string> = T extends `${infer F}${infer Rest}`
  ? F | StringToUnion<Rest> /** 知识点,extends语句中可以用联合直接拼接 */
  : never
