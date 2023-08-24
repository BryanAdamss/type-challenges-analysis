/** 参考:https://github.com/type-challenges/type-challenges/issues/14100 */
type IsTuple<T> = /** 判断never */ [T] extends [never]
  ? false
  : /** 知识点,判断 readonly,是为了屏蔽 lengtlike 对象{length:3}(数组和元组的长度是只读的) */ T extends readonly unknown[]
  ? /** 知识点,数组和元组的区别之一就是数组的长度是不固定的,类型为 number,而元组长度是固定的,类型为具体的数字 */ number extends T['length']
    ? false
    : true
  : false

/** number extends T['length'] 怎么生效的? */
/** T['length']是 number 时,number extends number -> true */
/** T['length']是 具体的1,4,9 时,number extends 1 -> false,number 的范围比1大 */

/** number extends T['length'] 可以用 T['length'] extends number 替代吗? */
/** T['length']无论为 number 或 1,4,9时,其 extends number 都为 true */
/** number extends number -> true */
/** 1 extends number -> true */
/** 所以不能调换 */
