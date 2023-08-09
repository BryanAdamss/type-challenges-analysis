/** 算法:递归判断后一个字符串S2是否小写开头,是则 S1转小写,继续递归 S2;不是,则S1转小写并再其后追加-,继续递归 S2 */

type KebabCase<S extends string> = S extends `${infer S1}${infer S2}`
  ? S2 extends Uncapitalize<S2> /** 知识点,Uncapitalize将字符串文字类型的第一个字符转换为小写 */
    ? `${Uncapitalize<S1>}${KebabCase<S2>}`
    : `${Uncapitalize<S1>}-${KebabCase<S2>}`
  : S

/** 第一次 */
// S=FooBarBaz S1=F S2=ooBarBaz
// => 满足S2 extends Uncapitalize<S2>
// => `${Uncapitalize<F>}${KebabCase<S2>}`
// => `f${KebabCase<ooBarBaz>}
/** 第二次 */
// S=ooBarBaz S1=o S2=oBarBaz
// => 满足S2 extends Uncapitalize<S2>
// => `${Uncapitalize<o>}${KebabCase<S2>}`
// => `fo${KebabCase<oBarBaz>}
/** 第三次 */
// S=oBarBaz S1=o S2=BarBaz
// => 不满足S2 extends Uncapitalize<S2>
// => `${Uncapitalize<o>}-${KebabCase<S2>}`
// => `foo-${KebabCase<BarBaz>}`
/** 第三次 */
// S=BarBaz S1=B S2=arBaz
// => 满足S2 extends Uncapitalize<S2>
// => `${Uncapitalize<B>}-${KebabCase<arBaz>}`
// => `foo-b${KebabCase<arBaz>}`
// ...
