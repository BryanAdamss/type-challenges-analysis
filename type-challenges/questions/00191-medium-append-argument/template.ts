// 我的实现里...预算符使用错误
// type AppendArgument<Fn extends (...args) => unknown, A> = Fn extends (
//   ...args: infer P
// ) => infer R
//   ? (...(P|A)) => R
//   : Fn

type AppendArgument<Fn extends (...args) => unknown, A> = Fn extends (
  ...args: infer P
) => infer R
  ? (...args: [...P, A]) => R
  : Fn
