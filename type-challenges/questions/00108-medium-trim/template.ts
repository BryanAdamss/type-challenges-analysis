type MyTrimRight<S extends string> = S extends `${infer L}${Space}`
  ? MyTrimRight<L>
  : S

type Trim<S extends string> = MyTrimRight<TrimLeft<S>>
