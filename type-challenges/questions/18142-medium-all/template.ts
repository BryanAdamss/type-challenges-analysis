/** 思路:使用 isEqual 递归判断 */
type All<T extends unknown[], Target> = T extends [infer F, ...infer R]
  ? MyEqual<F, Target> extends true
    ? All<R, Target>
    : false
  : true
