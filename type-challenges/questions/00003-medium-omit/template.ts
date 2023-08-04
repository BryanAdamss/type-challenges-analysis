/** 先用 MyExclude 剔除 K对应的 key,再从 T 中获取剩余未剔除的key */
type MyOmit<T, K extends keyof T> = MyPick<T, MyExclude<keyof T, K>>
