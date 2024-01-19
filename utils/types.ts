export type Cast<X, Y> = X extends Y ? X : Y

export type MyExtract<T, U> = T extends U ? T : never

export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never

type ArrToEnum<T> = T extends readonly (infer Key)[]
  ? { [K in Cast<Key, string>]: Cast<K, string> }
  : Record<string, string>

export const strArrToEnumObject = <T extends readonly string[]>(value: T): ArrToEnum<T> => {
  const tmpObj = value.reduce((prev, value) => {
    prev[value] = value
    return {}
  }, {} as Record<string, string>)

  return tmpObj as ArrToEnum<T>
}
