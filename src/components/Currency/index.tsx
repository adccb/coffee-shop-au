import { pipe, filter } from 'lodash/fp'

import { Currency as TCurrency } from '../../types'

import './main.scss'

type CurrencyProps = {
  currency: TCurrency
  condense?: boolean
  editable?: boolean
}

export const Currency: React.FC<CurrencyProps> = ({
  currency,
  condense = false,
}) => {
  const linesFor = (c: TCurrency) =>
    Object.entries(c).map(([k, v]) => (
      <span className={k} key={k}>
        {String(v).padStart(3, '\u00A0')} {k[0].toUpperCase()}P
      </span>
    ))

  return (
    <div className="currency">
      {condense
        ? pipe(
            Object.entries,
            filter(([_, v]) => v > 0),
            Object.fromEntries,
            linesFor,
          )(currency)
        : linesFor(currency)}
    </div>
  )
}
