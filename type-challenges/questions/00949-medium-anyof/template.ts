/** 知识点,没有属性的对象不能用{}判断,  需要用{ [key: string]: never }*/
type t3 = { name: 'test' } extends {} ? true : false // true
type t4 = { name: 'test' } extends { [key: string]: never } ? true : false // false
type t5 = {} extends { [key: string]: never } ? true : false // true

type MyFalsy =
  | false
  | 0
  | ''
  | []
  | {
      [key: string]: never
    }

type AnyOf<T extends readonly any[]> = T[number] extends MyFalsy ? false : true
