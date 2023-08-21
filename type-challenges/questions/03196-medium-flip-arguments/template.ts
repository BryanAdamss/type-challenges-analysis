type FlipArguments<T extends (...args: unknown[]) => unknown> = T extends (
  ...args: infer P
) => infer Ret
  ? (...args: Reverse<P>) => Ret
  : never
