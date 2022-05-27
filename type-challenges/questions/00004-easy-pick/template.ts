//js
function MyPick(todo, keys) {
  const obj = {}

  keys.forEach(key => {
    if (key in todo) {
      obj[key] = todo[key]
    }
  })

  return obj
}

// 重点(js->TS)
// 1. 返回一个对象-> type xxx = {}
// 2. 遍历keys-> 遍历联合类型；[P in K]
// 3. 取值 todo[key] ->索引类型；T[P]
// 4. 检查todo中是否存在key-> 获取类型中所有key+泛型约束；K extends keyof T

// ts
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}

// 知识点
// 遍历联合类型
// mapped
// https://www.typescriptlang.org/docs/handbook/2/mapped-types.html

// 索引类型
// indexed
// https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html

// 获取类型中的所有key，类比Object.keys()
// keyof、lookup
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#keyof-and-lookup-types

// 泛型约束
// extends
// https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints
