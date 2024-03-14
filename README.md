
# 知识点

## ts 类型和集合理论

- 集合论是ts类型的一个理论基础
- 每个类型都代表一类有相同特征的值
	- 例如`number`类型是一个无限的集合,代表所有的数字`string`和`object`同理
	- 除了无限集合还有一些有限集合,例如`boolean`/`null`/`undefined`/字符串常量/字符串常量联合类型都是有限集合,它们只包含有限个元素

```ts
// both true, string literal ⊂ string
type W = 'a' extends string ? true : false;
type X = 'a' | 'b' extends string ? true : false;

// true, string literal ⊆ same string literal
type Y = 'a' extends 'a' ? true : false;

// true, string ⊆ string
type Z = string extends string ? true : false;
```

- `unknown`/`any`/`never`
	- `unknown`是`top type`,类似集合中的全集`U`,包含所有可能值
		- 代表一个暂时未知的类型,它是在类型系统中明确定义的
		- 可以把任意值赋给`unknown`
		- 但不能把`unknown`直接赋值给其它类型(unknown/any 除外)
			- 需要先通过`typeof`或`type assert`确定类型再赋值
	- `any`代表这是一个任意值,更像一个 ts 指令,告诉 ts 禁用类型系统
		- 可以赋值给任意类型
		- 也可以被任意类型值赋值
	- `never`是一个`bottom type`,类似集合中的空集
		- 它只能接受`never`(any/unknown 都无法赋值给它)

```ts
let vAny: any = 'any1'
let vAny2:any = 'any2'

let vUnknown:unknown = 'unknown1'
let vUnknown2:unknown='unknown2'

let n1:number = 1
let s1:string ='hello'

/** never 无法被赋值,但它能赋值给其它任意类型 */
let nv:never = 'never' // error

/** 任意值(包括 unknown和 any 自身)都可以赋值给any */
vAny = n1
vAny = s1
vAny = vAny2
vAny = vUnknown
vAny = nv

/** any也可以赋值给任意类型 */
n1 = vAny
s1 = vAny
vUnknown = vAny

/** unknown 和 any一样,任意值都可以赋值给unknown */
vUnknown = n1
vUnknown = s1
vUnknown = vAny
vUnknown = vUnknown2

/** 但unknown无法赋值给其它类型,除了 any 和 unknown */
n1 = vUnknown2
vAny = vUnknown2
vUnknown = vUnknown2
```

![image](https://github.com/BryanAdamss/tdl-ts/assets/7441504/7783f5b3-1feb-4eb4-8c2b-50e96a10b755)

- 集合的运算
	- `|`和`&`
		- 当类型为非对象类型时,`|`类似取并集(union),`&`类似取交集(intersection)
		- ![image](https://github.com/BryanAdamss/tdl-ts/assets/7441504/72596bb2-637d-430a-900e-efe4317a71ba)
		- 而如果是对象类型,则有点相反`|`行为类似取交集,能用的方法或属性是二者共有的,`&`则类似取并集,能用的方法是二者相加的
		- 合并类型(取并集)的最佳实践
			- 非对象类型用`|`取并集
			- 对象类型用`&`取并集

```ts
type StringOrNumber = string | number; // 类似string + number ,string 或 number
type StringAndNumber = string & number; // never,二者不会有交集,所以 never

/** 对象或 interface 在用|或&时表现有点相反 */
interface ICat {
  eat(): void;
  meow(): void;
}

interface IDog {
  eat(): void;
  bark(): void;
}

declare function Pet(): ICat | IDog; 

const pet = new Pet();

pet.eat(); // 成功,只能用二者共有的方法
pet.meow(); // fails
pet.bark(); // fails


declare function AnotherPet(): ICat & IDog;

const anotherPet = new AnotherPet();

anotherPet.eat(); // 成功,类似取了并集
anotherPet.meow(); // succeeds
anotherPet.bark(); // succeeds
```

## 类型体操技巧

#### 用 `T[P]`获取类型

```ts
type Person = { age: number; name: string; alive: boolean };

type Age = Person["age"]; // number
```

#### 用`keyof`获取对象 key 组成的联合类型

```ts
type Obj = {
	hello:string
	test:number
}

type ObjKeys = keyof Obj // 'hello' | 'test'
```

### 用`keyof`获取数组索引组成的类型

```ts
// 数组本质是一个以索引为key的对象
// {0:'hello',1:'world'}
const ff = ['hello', 'world'] as const
const ff2 = ['hello','world']

type ffr<T> = { [p in keyof T]: p }

type ffrr = ffr<typeof ff> // readonly ["0","1"]
type ffrr2 = ffr<typeof ff2> // number[]
```

### 在对象中用`in`遍历联合类型

```ts
type Obj = {
	hello:string
	test:number
}

type ObjKeys = keyof Obj // 'hello' | 'test'

type NewType = {
	[Key in ObjKeys]:any
}

// `in`操作符的右侧通常跟一个联合类型，可以使用`in`来迭代这个联合类型
// 仅演示使用, K为每次迭代的项
K in 'name' | 'age' | 'sex'
K = 'name' // 第一次迭代结果
K = 'age'  // 第二次迭代结果
K = 'sex'  // 第三次迭代结果
```

### 用`T[number]`获取数组值组成的联合类型并用`in`遍历

```ts
const ff = ['hello', 'world'] as const

// 遍历数组应当使用 p in T[number]
type fffr<T extends readonly any[]> = { [p in T[number]]: p }
type fffrr = fffr<typeof ff> // {  hello: "hello";world: "world"; }
```

### 用`typeof`获取值空间的类型

```ts
const a = [1,2,3] // 值空间
type e = typeof a // number[]

const f = [1, 2, 'me'] as const
type g = typeof f // readonly [1,2,'me']
```

### 用`const`或`as const`做类型收缩

```ts
// const 类型字面量会自动收缩
let str = '123' // 类型为string
const strConst = '123' // 类型为'"123"' ，const意味着值不能被修改，值不能被修改，类型也不会变化，所以它的类型就固化收缩为"123"字

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
type ccr = typeof cc // { readonly test: 1; readonly hello: "world"; }

// 可用于var声明
var dd = { test: 1, hello: 'world' } as const
type ddr = typeof dd // { readonly test: 1; readonly hello: "world"; }
```

### 用`+`和`-`做属性添加删除

```ts
type Required<T> = {
  [P in keyof T]-?: T[P] // 去除?
}
type Person = {
  name: string;
  age?: number;
}

// 结果：{ name: string; age: number; }
type result = Required<Person>
```

### 用`extends`做类型约束

```ts
// 类型约束,U 必须为联合类型 T 的子集
U extends keyof T

// T 要是 string[]的子集
function Test<T extends string[]>(arg1:T){}
```

### 用`extends`做条件分支

```ts
// 基本形式,类似三元表达式
// T 是否是 U 一个子集
T extends U ? 'Y' : 'N'

type result1 = true extends boolean ? true : false                    // true
type result2 = 'name' extends 'name' | 'age' ? true : false           // true
type result3 = [1, 2, 3] extends { length: number; } ? true : false   // true
type result4 = [1, 2, 3] extends Array<number> ? true : false         // true
```

### 分布式条件类型

```ts
// 当用 extends 做条件分支时,若左右有一个为联合类型时,会触发分布式条件类型,类似数学中的分配律

// 内置工具：交集
type Extract<T, U> = T extends U ? T : never;
type type1 = 'name'|'age'
type type2 = 'name'|'address'|'sex'

// 交集结果：'name'
type result = Extract<type1, type2>

// 推理步骤
'name'|'age' extends 'name'|'address'|'sex' ? T : never
step1： ('name' extends 'name'|'address'|'sex' ? 'name' : never) => 'name'
step2:  ('age' extends 'name'|'address'|'sex' ? 'age' : never)   => never
result: 'name' | never => 'name'
```

### 用`infer`做推断占位

```ts
// infer 本质是延迟推导,可做推导占位用,等到真正推导成功后，它能准确的返回正确的类型

type ReturnType<T> = T extends (...args: any) => infer R ? R : never

const add = (a: number, b: number): number => {
  return a + b
}

// 结果: number
type result = ReturnType<typeof add>
```

### 用解构语法和 reset 操作符获取数组首个元素

```ts
type First<T extends any[]> = T extends [/** 首个 */infer Fir, /** reset 操作符代表后续类型全部暂存到 Res 中 */...infer Res] ? Fir : n
```

### 判断是否 never 的固定范式

```ts
type MyIsNever<T> = [T] extends [never] ? true : false

// 为何不能用 T extends never
type MyIsNever2<T> = T extends never ? true : false
type A = MyIsNever2<'str'> //str
type B = MyIsNever2<never> // never 因为MyIsNever2<never> 中的 never 实际上是一个空的联合类型，一项都没有，所以 T extends ... 过程实际上被整体跳过了，所以最后的结果就是 never。
```

### 关闭分布式条件类型的方法

- 在要判断的联合类型上加上`[]`
- https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types

```ts
type MyIsNever<T> = [T] extends [never] ? true : false
```

### 遍历联合类型自身的固定范式

```ts
/** 直接遍历联合类型自身的范式,extends 自身即可 */
type MyItrUnion<T> = T extends T ? [T] : never

/** 运用了分布式条件类型:在 条件类型 中使用 泛型参数 时，如果泛型参数是 联合类型，则会产生 distributive 的效果。 */
/** https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types */
// 'A'|'B' extends 'A'|'B'=>
// 'A' extends 'A'|'B'=> ['A']
// 'B' extends 'A'|'B'=> ['B']
// => ['A']|['B']

type C = MyItrUnion<'A' | 'B'> // ['A'] | ['B']
```

### 解构数组的联合类型也会产生分布式条件类型效果

```ts
type D = [1, 2] | [3, 4]
type E = ['a', 'b'] | ['c', 'd']

type F = [true, ...D, ...E]

// [true, 1, 2, "a", "b"] | [true, 1, 2, "c", "d"] | [true, 3, 4, "a", "b"] | [true, 3, 4, "c", "d"]
```

### 利用递归构造循环

- ts中没有循环语句,需要通过递归来模拟额循环

```ts
type LengthOfString1<
	S extends string,
	T extends string[] = []
> = S extends `${infer F}${infer R}`
	? LengthOfString1<R, [...T, F]> /** 递归模拟循环 */
	: T['length'] 
```

### 在方法中为参数的类型设置默认值

- 类似js 可以给类型参数设置默认值

```ts
type LengthOfString1<
	S extends string,
	T extends string[] = [] /** 知识点1,设置临时变量存储数组,默认为[] */
> = S extends `${infer F}${infer R}`
	? LengthOfString1<R, [...T, F]> 
	: T['length'] 
```

### 利用reset 操作符号用数组中添加元素

- ts 类型操作中没有 push 语法,可用 reset 操作符模拟

```ts
type LengthOfString1<
	S extends string,
	T extends string[] = [] 
> = S extends `${infer F}${infer R}`
	? LengthOfString1<R, [...T, F]> /** 知识点2,利用[...T,F]向数组添加元素 */
	: T['length'] 
```

### 涉及数字和运算,则构造数组并利用`T['length']`数组长度来做运算

```ts
type LengthOfString1<
	S extends string,
	T extends string[] = []
> = S extends `${infer F}${infer R}`
	? LengthOfString1<R, [...T, F]>
	: T['length'] /** 知识点3,通过将字符转为数组,获取 length 获取长度 */
```

### 用reset 操作符给数组降维

```ts
type MyFlatten<T extends unknown[], A extends unknown[] = []> = T extends [
	infer First,
	...infer Rest
]
	? First extends unknown[]
		? MyFlatten<
			[...First, ...Rest] /** 知识点 ...类似 js 中可以给数组降维 */,
			A>	
		: MyFlatten<Rest, [...A, First]>
	: A
```

### 使用字符串模板将 number 转为 string

```ts
type Absolute<T extends number | string | bigint> =
	`${T}` extends `-${infer R}` /** 知识点,使用字符串模板将 number 转为string */
	? R
	: `${T}`
type AB = -1_000_000n
type BC = `${AB}` // "-1000000"
```

### 使用模板字符串将 string 转 number

```ts
/** 知识点,字符转数字,https://devblogs.microsoft.com/typescript/announcing-typescript-4-8-beta/#improved-inference-for-infer-types-in-template-string-types */
type ParseInt<T extends string> = T extends `${infer Digit extends number}`
	? Digit
	: n
```

### 使用模板字符串将 boolean 转换为 string

```ts
/** 解法:https://github.com/type-challenges/type-challenges/issues/14094 */
type Flip<T extends Record<string, string | number | boolean>> = {
	/** 知识点,通过模板字符串,将 boolean 转换为 string 做为key 用 */
	[P in keyof T as `${T[P]}`]: P
}
```

### extends 分支中可以用联合类型操作符|直接拼接

```ts
type StringToUnion<T extends string> = T extends `${infer F}${infer Rest}`
	? F | StringToUnion<Rest> /** 知识点,extends语句中可以用联合直接拼接 */
	: never
```

### 使用内置类型转大小写

```ts
type KebabCase<S extends string> = S extends `${infer S1}${infer S2}`
	? S2 extends Uncapitalize<S2> /** 知识点,Uncapitalize将字符串文字类型的第一个字符转换为小写 */
		? `${Uncapitalize<S1>}${KebabCase<S2>}`
		: `${Uncapitalize<S1>}-${KebabCase<S2>}`
	: S
```

### 判断两个类型相等的固定范式

```ts
// 参考https://github.com/microsoft/TypeScript/issues/27024#issuecomment-421529650
type Equals<X, Y> =
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? true : false;
```

### 如何判断空对象

```ts
/** 知识点,没有属性的对象不能用{}判断, 需要用{ [key: string]: never }*/
type t3 = { name: 'test' } extends {} ? true : false // true
type t4 = { name: 'test' } extends { [key: string]: never } ? true : false // false
type t5 = {} extends { [key: string]: never } ? true : false // true
```

### 如何判断是否联合类型

- 非联合类型排除掉自身后只剩下 never,可通过此判断是否联合类型

```ts
type IsUnion<T, U = T> = [T] extends [never] /** 排除 never */
? false
: T extends T /** 遍历联合类型 */
? /** 知识点,非联合类型排除掉自身后只剩下 never,可通过此判断是否联合类型 */
	/** type CC = Exclude<string, string>=>never */
	[Exclude<U, T>] extends [never]
	? false
	: true
: never
```

### 如何给 key 重新起名

- 通过 as 进行 key-remapping ,在key-remapping 中可以用 extends ,infer等
- 常用在对象 key 遍历时,对 key 重新映射,示例1
- 文档:https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as

```ts
type EventConfig<Events extends { kind: string }> = {
	/** 遍历Events并取 E['kind']做 key 名 */
	[E in Events as E['kind']]: (event: E) => void
}  

type SquareEvent = { kind: 'square'; x: number; y: number }
type CircleEvent = { kind: 'circle'; radius: number }

type Config = EventConfig<SquareEvent | CircleEvent>
// {  
// square: (event: SquareEvent) => void;  
// circle: (event: CircleEvent) => void;  
// }
```

### 利用ts 中的 global type 简化书写

- `PropertyKey`是 `ts` 中的`global type`,等价于`string | number | symbol`
- `index-signature` 的类型是 `string | number | symbol`

```ts
/** 知识点,PropertyKey是ts 中的global type,等价于string | number | symbol */
type RemoveIndexSignature<T, P = PropertyKey> = {
/** 遍历T获得 key 并 re-mapping */
/** 知识点:index-signature 的取类型是 string | number | symbol */
/** 参考:https://www.totaltypescript.com/concepts/propertykey-type */
/** 如果 P(string | number | symbol) 是 Key 的子集,则说明是 index-signature,则剔除 */
[Key in keyof T as P extends Key
	? never
	: /** 如果 Key 是 P的子集,则说明是需要保留的 Key */
	Key extends P
	? Key
	: never]: T[Key]
```

### 模板字符串+infer 可以实现类似正则的效果

```ts
/** 知识点,模板字符串+infer 可实现类似正则匹配效果 */
type CheckPercentageSign<S> = S extends `${infer N}%` ? [N, '%'] : [S, '']
```

### infer推断出来的类型可以当参数传递

```ts
type CheckSign<Sign> = Sign extends '+' | '-' ? Sign : never
/** 知识点,模板字符串+infer 可实现类似正则匹配效果 */
type CheckPercentageSign<S> = S extends `${infer N}%` ? [N, '%'] : [S, '']

type PercentageParser<A extends string> = A extends `${CheckSign<
	/** 知识点,infer的类型可当参数传递 */
	infer L
>}${infer R}`
	? [L, ...CheckPercentageSign<R>]
	: ['', ...CheckPercentageSign<A>]
```

### 模板字符串中可以用 string 代表任意字符

```ts
/** 知识点,模板字符串匹配时,可不用 infer 接收,用string表明后面是 string 即可 */
type StartsWith<T extends string, U extends string> = T extends `${U}${string}`
	? true
	: f
```

### 如何让交叉类型在悬浮时直接展开

```ts
// 方法1,通过遍历展开
type IntersectionObj<T> = {
	[P in keyof T]: T[P]
}

type AAAA = {test:3} & {name:4} // 悬浮A 时显示的是{ test: 3 } & { name: 4 }

type BBBB = IntersectionObj<AAAA> // 悬浮BBBB时,显示的则是展开的{test:3,name:4}

// 方法2,递归深层次展开
type ExpandRecursively<T> = T extends object
? T extends infer O
	? { [K in keyof O]: ExpandRecursively<O[K]> }
	: never
: T

// 方法3,用 Omit<T,never>
type CCCC = Omit<AAAA,never> // // 悬浮CCCC时,显示的是展开的{test:3,name:4}
```

### 对象每个键的值转联合类型

```ts
/** 知识点,对象转联合,用 T[keyof T] */
type ObjectToUnion<T> = T[keyof T]
```

### 数组转联合类型

```ts
/** 知识点,数组转联合类型用下标*/
['1', '2']['number'] // '1' | '2'

type ArrToUnion<T> = T extends any[] ? T[number] : T
```

### 强制某类型(转换)为特定类型

```ts
/** 知识点,强制某个类型必须为 类型 A,否则原样返回,请用 T & A */
/** 参考:https://github.com/type-challenges/type-challenges/issues/6733#issuecomment-1136127999 */
type MustString<T> = T & string // string & T 结果也是一样
// 等价于
type MustStringEqual<T> = T extends string ? T : never

type AA = MustString<true> // never
type BBB = MustString<'hello'> // 'hello'
```

### 利用infer + | 将字符串转为联合类型

```ts
/** 知识点,利用 infer + | 将字符串转换为联合类型,"AB"->""|"A"|"B" */
type StringToUnion2<S> = S extends `${infer F}${infer R}`
	? F | StringToUnion2<R>
	: S
```

### 判断是否元组

- 数组和元组的区别之一就是数组的长度是不固定的,类型为 number,而元组长度是固定的,类型为具体的数字

```ts
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
```

### infer 时可以直接约束推断的值为某类型

```ts
type Join<T extends any[], U extends number | string> = T extends [
	/** 知识点:在infer 时用 extends 直接将 First 推断为 string */
	infer F extends string,
	...infer R
]
	? R['length'] extends 0
		? `${F}`
		: `${F}${U}${Join<R, U>}`
	: ''
```

### 如何遍历数组

```ts
// 递归+infer 取值
type A<T> = T extends [infer F,...infer R]?A<R>:never
```

### 如何从后向前遍历数组

```ts
type LastIndexOf<T extends unknown[], U> = T extends [
	/** 知识点:从后往前遍历数组 */
	...infer Rest,
	infer Last
]
? MyEqual<Last, U> extends true
	? /** 知识点:用前面数组的 length 代表当前元素索引 */
	Rest['length']
	: LastIndexOf<Rest, U>
: -1
```

### 如何将数字取整

```ts
/** 思路:先转成字符串,再和 bigint 比较 */
/** 知识点,bingint 只能为整数https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt */
type Integer<T extends number> = `${T}` extends `${bigint}` ? T : never
```

### 如何获取返回类型值的原始类型

```ts
/** 知识点,ts中的 valueOf 可以返回类型值的原始类型 */
type a = 3
type b<T> = T extends { valueOf: () => infer R } ? R : T
type c = b<a> // number
```

## 内置工具类型

### Awaited<Type> - 获取异步操作的返回类型

```ts
type A = Awaited<Promise<string>>; // string
type B = Awaited<Promise<Promise<number>>>; //number
type C = Awaited<boolean | Promise<number>>; // boolean | number
```

### Partial<Type> - 将类型中的所有属性转换为可选属性
```ts
interface Todo {
  title: string;
  description: string;
}

type A = Partial<Todo>

/**
type A = {
    title?: string | undefined;
    description?: string | undefined;
}
 */
```

### Required<Type> - 将类型中的所有可选属性转换为必选属性
```ts
interface Props {
  a?: number;
  b?: string;
}

type A = Required<Props>

/**
type A = {
    a: number;
    b: string;
}
*/
```

### Readonly<Type> - 将类型中的所有属性转换为只读属性
```ts
interface Todo {
  title: string;
}

type A = Readonly<Todo>

/**
 type A = {
    readonly title: string;
}
*/
```

### Record<Keys, Type> - 创建一个具有指定键和值类型的对象
```ts
interface CatInfo {
  age: number;
  breed: string;
}
 
type CatName = "miffy" | "boris" | "mordred";

type A  = Record<CatName, CatInfo> 

/**
type A = {
    miffy: CatInfo;
    boris: CatInfo;
    mordred: CatInfo;
}
*/
```

### Pick<Type, Keys> - 从类型中挑选指定的属性
```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
 
type TodoPreview = Pick<Todo, "title" | "completed">;

/** 
type TodoPreview = {
    title: string;
    completed: boolean;
}
*/
```

### Omit<Type, Keys> - 从类型中排除指定的属性
```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}
 
type TodoPreview = Omit<Todo, "description">;

/**
type TodoPreview = {
    title: string;
    completed: boolean;
    createdAt: number;
}
*/
```

### Exclude<UnionType, ExcludedMembers> - 从联合类型中排除指定的成员
```ts
type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // "c"
```

### Extract<Type, Union> - 从联合类型中提取指定的成员
```ts
type T0 = Extract<"a" | "b" | "c", "a">; // "a"
```

### NonNullable<Type> - 从类型中排除 `null` 和 `undefined`
```ts
type T0 = NonNullable<string | number | undefined>; // string | number
type T1 = NonNullable<string[] | null | undefined>; // string[]
```

### Parameters<Type> - 获取函数类型的参数类型
```ts

```

### ConstructorParameters<Type> - 获取构造函数类型的参数类型

### ReturnType<Type> - 获取函数类型的返回值类型

### InstanceType<Type> - 获取构造函数类型的实例类型

### ThisParameterType<Type> - 获取函数类型中的 `this` 参数类型

### OmitThisParameter<Type> - 从函数类型中移除 `this` 参数

### ThisType<Type> - 用于指定函数中的 `this` 类型

### Uppercase<StringType> - 将字符串转换为大写

### Lowercase<StringType> - 将字符串转换为小写

### Capitalize<StringType> - 将字符串首字母转换为大写

### Uncapitalize<StringType> - 将字符串首字母转换为小写

## 参考

- https://github.com/type-challenges/type-challenges
- https://www.bilibili.com/video/BV1vY41187Tx
- https://wangtunan.github.io/blog/typescript/challenge.html
- https://blog.thoughtspile.tech/2023/01/23/typescript-sets/
- https://ivov.dev/notes/typescript-and-set-theory
