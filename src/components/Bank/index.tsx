import { Context } from '../../machines/Cafe/'

import { Currency } from '../Currency'

import './main.scss'

type BankProps = { context: Context }

export const Bank: React.FC<BankProps> = ({ context }) => (
  <div id="bank">
    <h3>Bank</h3>

    <Currency currency={context.bank.current} />
  </div>
)
