type Replace<
  S extends string,
  From extends string,
  To extends string
> = From extends ''
  ? S
  : S extends `${infer Left}${From}${infer Rest}`
  ? `${Left}${To}${Rest}`
  : S
