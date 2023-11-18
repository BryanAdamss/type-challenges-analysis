type MergeAll<XS, P = {}> = XS extends [infer F, ...infer Rest]
  ? MergeAll<Rest, MyMerge<P, F>>
  : P

type MyMerge<F, S> = {
  [P in keyof F | keyof S]: P extends keyof S
    ? P extends keyof F
      ? S[P] | F[P]
      : S[P]
    : P extends keyof F
    ? F[P]
    : never
}
