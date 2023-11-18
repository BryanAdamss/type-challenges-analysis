/** 解法: https://github.com/type-challenges/type-challenges/issues/26864*/
type Primitives = {
  string: string
  number: number
  boolean: boolean
}

type HandlePrimitives<T, Type extends keyof Primitives> = T extends {
  enum: unknown[]
}
  ? T['enum'][number]
  : Primitives[Type]

type HandleObject<T> = T extends {
  properties: infer Properties extends Record<string, unknown>
}
  ? T extends { required: infer Required extends unknown[] }
    ? Omit<
        {
          [K in Required[number] & keyof Properties]: JSONSchema2TS<
            Properties[K]
          >
        } & {
          [K in Exclude<keyof Properties, Required[number]>]?: JSONSchema2TS<
            Properties[K]
          >
        },
        never
      >
    : {
        [K in keyof Properties]?: JSONSchema2TS<Properties[K]>
      }
  : Record<string, unknown>

type HandleArray<T> = T extends { items: infer Items }
  ? JSONSchema2TS<Items>[]
  : unknown[]

type JSONSchema2TS<T> = T extends { type: infer Type }
  ? Type extends keyof Primitives
    ? HandlePrimitives<T, Type>
    : Type extends 'object'
    ? HandleObject<T>
    : HandleArray<T>
  : never
