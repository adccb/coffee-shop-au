// ---- utility types ----
export type Dict<T> = Record<string, T>
export type StringDict = Dict<string>

export type Just<T> = { value: T }
export const just = <T>(t: T): Just<T> => ({ value: t })
export const isJust = <T extends Object>(m: Maybe<T>): m is Just<T> =>
  m.value !== null

export type Nothing = { value: null }
export const nothing = (): Nothing => ({ value: null })
export const isNothing = <T extends Object>(m: Maybe<T>): m is Nothing =>
  !isJust(m)

export type Maybe<T> = Just<T> | Nothing
export const maybe = <T extends Object>(t: T) =>
  t.hasOwnProperty('value') ? just(t) : nothing()

export const unwrap = <T extends Object>(d: T, m: Maybe<T>): T =>
  isJust(m) ? m.value : d

export * from './Character'
export * from './Currency'
