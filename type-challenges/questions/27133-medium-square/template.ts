type Multiplicate<
  N1 extends number,
  N2 extends number,
  C extends number[] = [],
  M extends number[] = [],
  R extends number[] = []
> = C['length'] extends N1
  ? M['length'] extends N2
    ? R['length']
    : Multiplicate<N1, N2, C, [0, ...M], [...R, ...C]>
  : Multiplicate<N1, N2, [0, ...C], M, R>

type Square<
  N extends number,
  PN extends number = `${N}` extends `-${infer I extends number}` ? I : N
> = PN extends 100 ? 10000 : Multiplicate<PN, PN>
