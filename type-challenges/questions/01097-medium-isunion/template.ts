type IsUnion<T, U = T> = [T] extends [never] /** 排除 never */
  ? false
  : T extends T /** 遍历类型 */
  ? /** 知识点,非联合类型排除掉自身后只剩下 never,可通过此判断是否联合类型 */
    /** type CC = Exclude<string, string>=>never */
    [Exclude<U, T>] extends [never]
    ? false
    : true
  : never

// // 案例一
// type TT = string | number
// step1: string | number extends string | number
// step2: string extends string | number => [number] extends [never] => true
// step3: number extends string | number => [string] extends [never] => true
// step4: true | true
// result: true

// // 案例二
// type TTT = string
// step1: string extends string
// step2: [never] extends [never] => false
// result: false

/** 其它答案:https://github.com/type-challenges/type-challenges/issues/1140 */
