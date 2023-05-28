import { assign } from 'xstate'
import { merge } from 'lodash/fp'

import { Context, CoffeeDrink, randomCoffeeDrink } from '../../context'
import { Event } from '../../events'
import { CurrencyWithOperations, fromCopper } from '../../../../types'
import { randomBetween } from '../../../../utils'

// Customers have a drink preference, chosen randomly from valid
// coffee drinks. they also have a budget for their favorite
// drink; that's between 5 and 15 copper for now
export type Customer = {
  budget: CurrencyWithOperations
  drinkPreference: CoffeeDrink
}

export const customer = (
  { budget } = { budget: { min: 5, max: 10 } },
): Customer => ({
  drinkPreference: randomCoffeeDrink(),
  budget: fromCopper(Math.floor(Math.random() * budget.max) + budget.min),
})

// each customer walks into the coffee shop, looks for their
// preferred coffee drink, and looks at the budget. if the price
// is below their budget, they buy. otherwise they leave dissatisfied.
export const processCustomer = (
  context: Context,
  { drinkPreference, budget }: Customer,
) =>
  context.pricing[drinkPreference].lessThan(budget)
    ? merge(context, {
        bank: {
          current: context.bank.current.plus(context.pricing[drinkPreference]),
        },
      })
    : context

export const tick = assign<Context, Event>((context: Context) => {
  const {
    yesterday: { visitors },
  } = context

  const customers = Math.max(visitors, 50) * randomBetween(0.8, 1.5)

  console.log('ran!')

  return Array.from({ length: customers })
    .map(() => customer({ budget: { min: 5, max: 10 } }))
    .reduce(processCustomer, context)
})
