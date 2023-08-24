/** 我的解法:思路是递归+构造一个数组,不断增加 length,判断 T/U 哪个先和 length 相等,先相等的小 */
type MyGreaterThan<
  T extends number,
  U extends number,
  Temp extends unknown[] = []
> = /** 相等场景 */ T extends U
  ? false
  : Temp['length'] extends U
  ? true
  : Temp['length'] extends T
  ? false
  : MyGreaterThan<T, U, [...Temp, 1]>

/** https://github.com/type-challenges/type-challenges/issues/14098 */
/** 官方解法1:递归+谁先达到指定 length,和我的解法思路一样,无法通过大数用例 */
type GreaterThan1<
  T extends number,
  U extends number,
  R extends any[] = []
> = T extends R['length']
  ? false
  : U extends R['length']
  ? true
  : GreaterThan1<T, U, [...R, 1]>

/** 官方解法2:构造数组+[...A,1]比较,无法通过大数用例 */
/** 知识点,比较数字大小,可以构造不同长度的A/B数组,判断 B 是否可以表示为[...A,1],如果可以 B 大,否则 A 大 */
type newArr<T extends number, A extends any[] = []> = A['length'] extends T
  ? A
  : newArr<T, [...A, 1]>
type GreaterArr<T extends any[], U extends any[]> = U extends [...T, ...any]
  ? false
  : true

type Ret = GreaterArr<[1, 1], [1, 1, 1]> //false
type Ret2 = GreaterArr<[1, 1, 1], [1, 1]> // true

type GreaterThan2<T extends number, U extends number> = GreaterArr<
  newArr<T>,
  newArr<U>
>

/** 更完善的解法,能通过大数用例*/
/** 参考:https://github.com/type-challenges/type-challenges/issues/14098#issuecomment-1565168052 */
type GreaterThanBySmallNumber<
  T extends number,
  U extends number,
  Arr extends any[] = []
> = T extends Arr['length']
  ? false
  : U extends Arr['length']
  ? true
  : GreaterThanBySmallNumber<T, U, [...Arr, any]>

type StringToArray<S extends string> = S extends `${infer First}${infer Rest}`
  ? [First, ...StringToArray<Rest>]
  : []

type UnShift<T extends string[]> = T extends [string, ...infer Rest] ? Rest : []
type GreaterThanByArray<
  T extends string[],
  U extends string[]
> = T[0] extends U[0]
  ? T['length'] extends 1
    ? false
    : GreaterThanByArray<UnShift<T>, UnShift<U>>
  : GreaterThanBySmallNumber<ParseInt<T[0]>, ParseInt<U[0]>>

type GreaterThan<
  T extends number,
  U extends number,
  TArr extends string[] = StringToArray<`${T}`>,
  UArr extends string[] = StringToArray<`${U}`>
> = TArr['length'] extends UArr['length']
  ? GreaterThanByArray<TArr, UArr>
  : GreaterThanBySmallNumber<TArr['length'], UArr['length']>
