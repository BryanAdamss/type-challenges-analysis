type Concat<T extends any[], U extends any[]> = [...T, ...U]

// T extends any[]：用来限制T是一个数组，如果传递非数组会报错，U也是一样的道理。
// [...T, ...U]：可以理解成JavaScript的扩展运算符...。
