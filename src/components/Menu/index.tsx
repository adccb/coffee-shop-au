import { useState } from 'react'

import { Context } from '../../machines/Cafe/'
import { Currency as TCurrency } from '../../types'
import { Currency } from '../Currency'

import './main.scss'

type MenuItemProps = {
  item: string
  price: TCurrency
  setPrice: (p: number) => void
}
const MenuItem: React.FC<MenuItemProps> = ({ item, price, setPrice }) => {
  const [isEditing, setEditing] = useState(false)
  const toggleEditing = () => setEditing(!isEditing)

  const savePrice = (e: React.KeyboardEvent<HTMLInputElement>) => {}

  return (
    <div className="row menu-item" onClick={toggleEditing}>
      <span>{item}</span>
      <Currency condense currency={price} />
    </div>
  )
}

type MenuProps = { context: Context }
const Menu: React.FC<MenuProps> = ({ context }) => (
  <div id="menu">
    <h3>Menu</h3>

    {Object.entries(context.pricing).map(([item, price]) => (
      <MenuItem
        key={item}
        item={item}
        price={price}
        setPrice={p => console.log(item, price, p)}
      />
    ))}
  </div>
)

export default Menu
