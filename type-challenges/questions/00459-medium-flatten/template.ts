type MyFlatten<T extends unknown[], A extends unknown[] = []> = T extends [
  infer First,
  ...infer Rest
]
  ? First extends unknown[]
    ? MyFlatten<
        [...First, ...Rest] /** 知识点 ...类似 js 中可以给数组降纬 */,
        A
      >
    : MyFlatten<Rest, [...A, First]>
  : A
