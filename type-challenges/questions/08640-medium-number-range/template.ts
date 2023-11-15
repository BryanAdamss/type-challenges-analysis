type NumberRange<
  L extends number,
  H extends number,
  /** 存储,若L 为0 则初始化[],否则至少为1,有两个数,则初始化为[1,1] */
  Idx extends 1[] = L extends 0 ? [] : [1, 1],
  Res = never
> = Idx['length'] extends H
  ? H | Res
  : NumberRange<L, H, [...Idx, 1], Idx['length'] | Res>
