type CheckRepeatedTuple<
  T extends unknown[],
  U extends unknown[] = []
> = T extends [infer F, ...infer Rest]
  ? Includes<U, F> extends true
    ? true
    : CheckRepeatedTuple<Rest, [...U, F]>
  : false
