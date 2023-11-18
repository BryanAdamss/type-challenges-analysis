type DeepMutable<T> = T extends (...args: any[]) => any
  ? T
  : /** 通过-去除 readonly */ { -readonly [P in keyof T]: DeepMutable<T[P]> }
