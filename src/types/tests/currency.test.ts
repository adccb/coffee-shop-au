import {
  CurrencyWithOperations,
  toCurrency,
  toCopper,
  fromCopper,
} from '../Currency'

const serializeEquals = (a: any, b: any) =>
  expect(JSON.stringify(a)).toEqual(JSON.stringify(b))

describe('Currency', () => {
  describe('toCopper', () => {
    const testCases: [number, CurrencyWithOperations][] = [
      [1, toCurrency({ copper: 1 })],
      [12, toCurrency({ silver: 1, copper: 2 })],
      [38, toCurrency({ silver: 3, copper: 8 })],
      [100, toCurrency({ silver: 10 })],
      [100, toCurrency({ gold: 1 })],
      [100, toCurrency({ copper: 100 })],
      [237, toCurrency({ gold: 2, silver: 3, copper: 7 })],
      [237, toCurrency({ silver: 23, copper: 7 })],
      [930, toCurrency({ copper: 930 })],
      [930, toCurrency({ gold: 9, silver: 3 })],
      [930, toCurrency({ gold: 9, silver: 2, copper: 10 })],
      [1000, toCurrency({ silver: 90, copper: 100 })],
    ]

    it('should convert Currency -> number', () =>
      testCases.forEach(([n, c]) => serializeEquals(toCopper(c), n)))
  })

  describe('fromCopper', () => {
    // these must be reduced; fromCopper works from gold
    // on down, so 1g !== 9s10c
    const testCases: [number, CurrencyWithOperations][] = [
      [1, toCurrency({ copper: 1 })],
      [12, toCurrency({ silver: 1, copper: 2 })],
      [38, toCurrency({ silver: 3, copper: 8 })],
      [100, toCurrency({ gold: 1 })],
      [237, toCurrency({ gold: 2, silver: 3, copper: 7 })],
      [237, toCurrency({ gold: 2, silver: 3, copper: 7 })],
      [930, toCurrency({ gold: 9, silver: 3 })],
    ]

    // comparing serialize equality here because the functions
    // attached by attachOperations will be at different memory
    // addresses at runtime; serializing first lets jest simplify
    // to just "[Function]" === "[Function]"
    it('should convert number -> Currency', () =>
      testCases.forEach(([n, c]) => serializeEquals(fromCopper(n), c)))
  })

  describe('plus / minus', () => {
    const zero = toCurrency({})
    const copper = toCurrency({ copper: 1 })
    const silver = toCurrency({ silver: 1 })
    const gold = toCurrency({ gold: 1 })

    it('should add correctly', () => {
      serializeEquals(zero.plus(copper), copper)
      serializeEquals(copper.plus(copper), toCurrency({ copper: 2 }))
      serializeEquals(
        copper.plus(copper).plus(silver).plus(gold),
        toCurrency({ gold: 1, silver: 1, copper: 2 }),
      )
    })
  })
})
