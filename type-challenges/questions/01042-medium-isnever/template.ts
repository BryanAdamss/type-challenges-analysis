/** 原理见: questions/00296-medium-permutation */
/** https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types */
type IsNever<T> = [T] extends [never] ? true : false
