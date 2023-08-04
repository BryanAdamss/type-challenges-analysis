type Last<T extends any[]> = T extends [...infer F, infer L] ? L : never
