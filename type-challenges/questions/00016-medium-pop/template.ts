type MyPop<T extends any[]> = T extends [...infer F, infer L] ? F : never

/** 答案:https://github.com/type-challenges/type-challenges/issues/37#issuecomment-687871052 */
type Pop<T extends unknown[]> = T extends [...infer F, unknown] ? F : never
