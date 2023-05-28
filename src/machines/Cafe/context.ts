import { CurrencyWithOperations, toCurrency } from '../../types'

export const coffeeDrinks = [
  'espresso',
  'cappuccino',
  'latte',
  'cortado',
] as const

export type CoffeeDrink = (typeof coffeeDrinks)[number]
export const randomCoffeeDrink = () =>
  coffeeDrinks[Math.floor(Math.random() * coffeeDrinks.length)]

export type Context = {
  yesterday: {
    visitors: number
    satisfied: number
    dissatisfied: number
  }
  bank: { current: CurrencyWithOperations }
  pricing: Record<CoffeeDrink, CurrencyWithOperations>
}

export const defaultContext: Context = {
  yesterday: {
    visitors: 0,
    satisfied: 0,
    dissatisfied: 0,
  },
  bank: {
    current: toCurrency(),
  },
  pricing: {
    espresso: toCurrency(),
    cappuccino: toCurrency(),
    latte: toCurrency(),
    cortado: toCurrency(),
  },
}

export * from './models/workday/'
