/* 获取tuple长度 */
/* 解法 */

/* js */
function Len(arr) {
  if (!Array.isArray(arr)) throw new Error('arr is not a array')

  return arr.length
}

type Length<T extends readonly any[]> = T['length']

/* 知识点 */
/* tuple：item类型定死、长度固定的数组 */
/* https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types */

/* 获取数组类型长度和元组类型长度的差异 */

type TupleA = [string, number]
type TupleALen = TupleA['length'] // 2；元组返回具体值

type StrArr = string[]
type StrArrLen = StrArr['length'] // number；
