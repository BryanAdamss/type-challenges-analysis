type Insert<T extends unknown[], U> = T extends [infer F, ...infer L]
  ? [F, U, ...L] | [F, ...Insert<L, U>]
  : [U]

type PermutationsOfTuple<
  T extends unknown[],
  Result extends unknown[] = []
> = T extends [infer F, ...infer L]
  ? PermutationsOfTuple<L, Insert<Result, F> | [F, ...Result]>
  : Result
