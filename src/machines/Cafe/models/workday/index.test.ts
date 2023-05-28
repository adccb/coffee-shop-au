import { merge } from 'lodash/fp'

import { processCustomer, customer as createCustomer } from './'
import { toCopper, toCurrency } from '../../../../types'
import { Context, defaultContext } from '../../context'

describe('customer', () => {
  const customers = Array.from({ length: 2000 }, createCustomer)

  it('should generate budgets x for which 5 < x < 15', () => {
    expect(
      customers
        .map(({ budget }) => toCopper(budget))
        .every(i => i > 0 && i < 15),
    ).toBe(true)
  })
})

describe('processCustomer', () => {
  const customer = createCustomer({ budget: { min: 5, max: 10 } })

  it('should correctly process customers', () => {
    const context: Context = merge(defaultContext, {
      pricing: {
        [customer.drinkPreference]: customer.budget.minus(
          toCurrency({ copper: 1 }),
        ),
      },
    })

    // default bank is empty
    expect(toCopper(context.bank.current)).toBe(0)

    // run the first transaction
    const firstTransaction = processCustomer(context, customer)

    // cha-ching
    context.bank.current = firstTransaction.bank.current
    expect(toCopper(firstTransaction.bank.current)).toBe(
      toCopper(firstTransaction.pricing[customer.drinkPreference]),
    )

    // adjust the price above the customer's budget and try again
    context.pricing[customer.drinkPreference] = customer.budget.plus(
      toCurrency({ gold: 1 }),
    )

    const secondTransaction = processCustomer(context, customer)

    // no deal!
    expect(toCopper(secondTransaction.bank.current)).toBe(
      toCopper(firstTransaction.bank.current),
    )
  })
})
