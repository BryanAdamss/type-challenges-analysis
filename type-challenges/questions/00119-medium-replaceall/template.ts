// 我的实现7/8case无法通过
// type ReplaceAll<
//   S extends string,
//   From extends string,
//   To extends string
// > = From extends ''
//   ? S
//   : S extends `${infer Left}${From}${infer Rest}`
//   ? `${Left}${To}${Rest}` extends `${infer Left}${From}${infer Rest}`
//     ? ReplaceAll<`${Left}${To}${Rest}`, From, To>
//     : `${Left}${To}${Rest}`
//   : S

type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = From extends ''
  ? S
  : S extends `${infer Left}${From}${infer Right}`
  ? `${Left}${To}${ReplaceAll<Right, From, To>}`
  : S
