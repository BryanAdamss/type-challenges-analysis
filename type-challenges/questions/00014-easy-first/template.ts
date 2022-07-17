// 知识点
// 判断为数组并取出首元素类型

// 解法1：判断
// JS
// function first(arr) {
//   if (!Array.isArray(arr)) throw new Error('arr is not a array')

//   return JSON.stringify([]) === '[]' ? 'never' : arr[0]
// }

// TS
// type First<T extends any[]> = T extends [] ? never : T[0]
// 如果类型T是一个空数组类型，则T[0]返回undefined类型
// type T = []
// type TF = T[0] // undefined

// 解法2：判断T的length属性
// JS
// function first(arr) {
//   if (!Array.isArray(arr)) throw new Error('arr is not a array')

//   return arr.length === 0 ? 'never' : arr[0]
// }

// TS
// type First<T extends any[]> = T['length'] extends 0 ? never : T[0]

// 解法3：判断T[0]是否存在于T[number]联合类型中
// JS
// function first(arr) {
//   if (!Array.isArray(arr)) throw new Error('arr is not a array')

//   return arr.includes(arr[0]) ? arr[0] : 'never'
// }

// TS
// type First<T extends any[]> = T[0] extends T[number] ? T[0] : never

// type T = [1,2,3]
// type Tn = T[number] // 3|1|2
// type T0 =T[0]  // 1
// 如果T为[],则Tn为never，T[0]为undefined，undefined extends never 为 false

// 解法4：利用infer推断，类似js解构
// JS
// function first(arr) {
//   if (!Array.isArray(arr)) throw new Error('arr is not a array')

//   const [first, ...rest] = arr

//   return first || 'never'
// }

// TS
// 如果解构出一个Fir则返回，否则返回never
type First<T extends any[]> = T extends [infer Fir, ...infer Res] ? Fir : never
// infer 一般结合extedns使用，且只能出现在extends的true分支中
