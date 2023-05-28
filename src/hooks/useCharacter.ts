import { useState } from 'react'
import { merge } from 'lodash/fp'

import { Character, defaultCharacter } from '../types'

const key = '@idle-game/character'
const stored = window.localStorage.getItem(key)
const store = (c: Character) =>
  window.localStorage.setItem(key, JSON.stringify(c))

export const useCharacter = () => {
  const [character, _setCharacter] = useState<Character>(() =>
    stored ? JSON.parse(stored) : defaultCharacter,
  )

  const setCharacter = (c: Partial<Character>) => {
    const newCharacter = merge(character, c)
    store(newCharacter)
    _setCharacter(newCharacter)
  }

  return [character, setCharacter] as const
}
