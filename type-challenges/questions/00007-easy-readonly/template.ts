// js

function MyReadonly(obj) {
  let temp = null
  for (const k in obj) {
    if (obj.hasOwnProperty(k)) {
      temp[`readonly ${k}`] = obj[k]
    }
  }

  return temp
}

// 重点(js->TS)
// 1. 返回一个对象-> type xxx ={}
// 2. 遍历 obj所有属性 (js对象 ts接口)-> K in keyof T
// 3. 添加 readonly关键字-> readonly xxxx
// 4. 通过k获取obj(接口)中的值-> T[K]

// ts
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K]
}

// 获取interface所有key
interface ToDo {
  a: string
  b: string
}

type ks = keyof ToDo // ks 'a' | 'b'

const testKsTypeA: ks = 'a'
const testKsTypeB: ks = 'b'
const testKsTypeC: ks = 'c' // error

// readonly
// https://www.typescriptlang.org/docs/handbook/2/objects.html#readonly-properties
// https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype
