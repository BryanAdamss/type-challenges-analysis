/** https://github.com/type-challenges/type-challenges/issues/149#issue-694090143 */

type LookUp<U, T> = U extends { type: T } ? U : never
