type FindAll<
  T extends string,
  P extends string,
  Result extends any[] = [],
  Index extends any[] = []
> = P extends ''
  ? []
  : T extends `${string}${infer Last}`
  ? T extends `${P}${string}`
    ? /** 找到目标字符串,则 Result 和 Index 都加1 */
      FindAll<Last, P, [...Result, Index['length']], [...Index, 0]>
    : FindAll<Last, P, Result, [...Index, 0]>
  : Result

type LL<T> = T extends `${string}${infer Last}` ? Last : T

type Test11 = LL<'Hello'> // ello
