type Subsequence<T extends any[], Prefix extends any[] = []> = T extends [
  infer F,
  ...infer R
]
  ? Subsequence<R, Prefix | [...Prefix, F]>
  : Prefix
