type ReplaceFirst<T extends readonly unknown[], From, To> = T extends [
  infer First,
  ...infer Rest
]
  ? First extends From
    ? [To, ...Rest]
    : [First, ...ReplaceFirst<Rest, From, To>]
  : T
