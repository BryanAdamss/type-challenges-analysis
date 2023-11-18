type PublicType<T extends object> = {
  /** remapping key 即可 */
  [P in keyof T as P extends `_${string}` ? never : P]: T[P]
}
