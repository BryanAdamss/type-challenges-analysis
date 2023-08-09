/** 合并 O 和 O1集和,然后用剔除公有的 key */
/** https://github.com/type-challenges/type-challenges/issues/3014 */
type Diff<O, O1> = Omit<
  O & O1 /** 知识点1,用&合并2个对象得到,结果会获得所有属性 key */,
  keyof (
    | O
    | O1
  ) /** 知识点2,用|合并两个对象,最后的联合类型只包含2者交集部分的 key */
>

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type result = keyof (Foo | Bar) // "name" | "age"

interface Colorful {
  color: string
}
interface Circle {
  radius: number
}
type ColorfulCircle = keyof (Colorful & Circle) // "color" | "radius"
