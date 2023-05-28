import { merge } from 'lodash/fp'

export const toCopper = ({
  gold,
  silver,
  copper,
}: CurrencyWithOperations): number =>
  Number(gold * 100) + Number(silver * 10) + copper

export const fromCopper = (n: number): CurrencyWithOperations => {
  const gold = Math.floor(n / 100)
  const silver = Math.floor((n - gold * 100) / 10)
  const copper = n - gold * 100 - silver * 10

  return toCurrency({ gold, silver, copper })
}

export const plus =
  (a: CurrencyWithOperations) => (b: CurrencyWithOperations) =>
    fromCopper(toCopper(a) + toCopper(b))

export const minus =
  (a: CurrencyWithOperations) => (b: CurrencyWithOperations) =>
    fromCopper(toCopper(a) - toCopper(b))

export const moreThan =
  (a: CurrencyWithOperations) =>
  (b: CurrencyWithOperations): boolean =>
    toCopper(b) > toCopper(a)

export const lessThan =
  (a: CurrencyWithOperations) =>
  (b: CurrencyWithOperations): boolean =>
    toCopper(b) > toCopper(a)

export type Currency = {
  gold: number
  silver: number
  copper: number
}

export type CurrencyWithOperations = Currency & {
  plus: (c: CurrencyWithOperations) => CurrencyWithOperations
  minus: (c: CurrencyWithOperations) => CurrencyWithOperations
  moreThan: (c: CurrencyWithOperations) => boolean
  lessThan: (c: CurrencyWithOperations) => boolean
}

const applyOperations = (c: Currency): CurrencyWithOperations => ({
  ...c,
  plus: plus(c as CurrencyWithOperations),
  minus: minus(c as CurrencyWithOperations),
  moreThan: moreThan(c as CurrencyWithOperations),
  lessThan: lessThan(c as CurrencyWithOperations),
})

export const defaultCurrency = applyOperations({
  gold: 0,
  silver: 0,
  copper: 0,
})

export const toCurrency = (p: Partial<Currency> = {}): CurrencyWithOperations =>
  applyOperations(merge(defaultCurrency, p))
