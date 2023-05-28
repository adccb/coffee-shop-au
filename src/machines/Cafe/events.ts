import { coffeeDrinks } from './context'

export const eventNames = {
  clockIn: '@events/clockIn',
  clockOut: '@events/clockOut',
  priceChange: '@events/priceChange',
} as const

const is =
  <T>(type: string) =>
  (a: any): a is T =>
    a.type === type

export type ClockIn = { type: typeof eventNames.clockIn }
export const clockIn = (): ClockIn => ({ type: eventNames.clockIn })
export const isClockIn = is<ClockIn>(eventNames.clockIn)

export type ClockOut = { type: typeof eventNames.clockOut }
export const clockOut = (): ClockOut => ({ type: eventNames.clockOut })
export const isClockOut = is<ClockOut>(eventNames.clockOut)

export type PriceChange = {
  type: typeof eventNames.priceChange
  drink: (typeof coffeeDrinks)[number]
  price: number
}

export const priceChange = (e: Omit<PriceChange, 'type'>) => ({
  ...e,
  type: eventNames.priceChange,
})

export const isPriceChange = is<PriceChange>(eventNames.priceChange)

export type Event = ClockIn | ClockOut | PriceChange
