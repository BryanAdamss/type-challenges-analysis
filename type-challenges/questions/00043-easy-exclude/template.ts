/* js */
function MyExclude(T, U) {
  const ret = []
  T.forEach(item => {
    !U.includes(item) && ret.push(item)
  })

  return ret
}

/* ts */
type MyExclude<T, U> = T extends U ? never : T

/* 重点 */
// 1、联合类型extends时，会逐项对比
// T : [1,2,3] U: [1]
// T extends U ? never : T
// 会进行如何对比
// T      U   返回
// 1 <--> 1   never->剔除
// 2 <--> 1   2
// 3 <--> 1   3
// 最终返回[2,3]

type MyExclude2<T, U> = T extends U ? '1' : '2'

type t1 = MyExclude2<'a' | 'b' | 'c', 'a'> // '1' | '2'
// T    U   返回
// 'a'  'a' '1'
// 'b'  'a' '2'
// 'c'  'a' '2'
// 最终返回'1'|'2'
