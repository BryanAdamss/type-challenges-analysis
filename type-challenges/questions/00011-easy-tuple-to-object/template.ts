/** js实现 */
function tupleToObject(arr) {
  if (
    arr.some(
      i =>
        typeof i !== 'string' && typeof i !== 'number' && typeof i !== 'symbol'
    )
  ) {
    throw new Error('只能接收 (string|number|symbol)[] 类型入参')
  }

  let temp = {}

  arr.forEach(i => {
    temp[i] = i
  })

  return temp
}

// js->ts
// 1. 返回对象
// 2. 限制数组元素类型->数组本质是对象，对象的key只能是string|number|symbol
// 3. 遍历array -> P in T[number]

/** ts */
type TupleToObject<T extends readonly (string | number | symbol)[]> = {
  [P in T[number]]: P
}

/** 知识点 */

// 1. typeof，在ts中用于获取值空间变量的类型（值空间->类型空间）
// https://www.typescriptlang.org/docs/handbook/2/typeof-types.html#the-typeof-type-operator

// 其行为和js的typeof有差别
// js中的typeof，返回一个值，此值用来标识变量的类型，本质还是值，属于值空间
const a = [1, 2, 3]
const b = typeof a // 'object'

const c = 'hello'
const d = typeof c // 'string'

// ts中的typeof，返回一个类型，属于类型空间
type e = typeof a // number[]

const f = [1, 2, 'me'] as const
type g = typeof f // readonly [1,2,'me']

// 2. 字面量类型
// https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#handbook-content
let str = '123' // 类型为string

const strConst = '123' // 类型为'"123"' ，const意味着值不能被修改，值不能被修改，类型也不会变化，所以它的类型就固化收缩为"123"字面量类型了

// 3. as const const断言
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions
// 用于将字面量值断言为const，不能被修改
// 使用后，字面量值的类型会进一步收缩
// 对象字面量属性会添加上readonly修饰符
// 数组会转变为只读元组
let x = 'hello'
type xr = typeof x // string

let y = 'hello' as const
type yr = typeof y // '"hello"' ，从string 收缩为 '"hello"'

let aa = [1, 2, 3] as const
type aar = typeof aa // readonly [1,2,3]

let bb = { test: 1, hello: 'world' }
type bbr = typeof bb //{test:number;hello:string;}

// 可用于let声明
let cc = { test: 1, hello: 'world' } as const
type ccr = typeof cc // {  readonly test: 1;  readonly hello: "world"; }

// 可用于var声明
var dd = { test: 1, hello: 'world' } as const
type ddr = typeof dd // {  readonly test: 1;  readonly hello: "world"; }

// 也可用于const声明自身
const ee = { test: 1, hello: 'world' } as const
type eer = typeof ee // {  readonly test: 1;  readonly hello: "world"; }

// 4. keyof 一个array，将返回索引下表组成的类型
// https://www.typescriptlang.org/docs/handbook/2/keyof-types.html#the-keyof-type-operator
// 本质数组是一个以索引为key的对象
// {0:'hello',1:'world'}
const ff = ['hello', 'world'] as const

type ffr<T> = { [p in keyof T]: p }

type ffrr = ffr<typeof ff> // readonly ["0","1"]

// 遍历数组应当使用 p in T[number]
type fffr<T extends readonly any[]> = { [p in T[number]]: p }
type fffrr = fffr<typeof ff>

// 总结
// union、interface 遍历使用 [P in keyof T]
// array遍历使用[P in T[number]]
