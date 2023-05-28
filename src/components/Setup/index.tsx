import { useState, FormEvent } from 'react'
import { merge, pipe } from 'lodash/fp'

import { Character as TCharacter } from '../../types'
import './main.scss'

type SetupProps = {
  character: TCharacter
  save: (p: Partial<TCharacter>) => void
}

export const Setup: React.FC<SetupProps> = ({
  character: storedCharacter,
  save,
}) => {
  const [character, setCharacter] = useState(storedCharacter)
  const updateCharacter = pipe(merge(character), setCharacter)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    save(character)
  }

  return (
    <div id="setup">
      <form onSubmit={handleSubmit}>
        <h1>hi! it's nice to meet you.</h1>
        <p>
          thank you so much for coming all this way, especially to make coffee!
        </p>

        <div>
          <label htmlFor="name">
            before we show you around, what's your name?
          </label>
          <input
            id="name"
            type="text"
            value={character.name}
            onChange={e => updateCharacter({ name: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="gender">
            we have to ask this for the HR forms: how would you describe your
            gender?
          </label>
          <input
            id="gender"
            type="text"
            value={character.gender}
            onChange={e => updateCharacter({ gender: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="species">
            another awkward one: what, uh, is your species? that's a weird
            question, sorry.
          </label>
          <input
            id="species"
            type="text"
            value={character.species}
            onChange={e => updateCharacter({ species: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="character-class">
            and what was your character class? you know, from before you
            retired?
          </label>
          <input
            id="character-class"
            type="text"
            value={character.characterClass}
            onChange={e => updateCharacter({ characterClass: e.target.value })}
          />
        </div>

        <button type="submit">open the cafe!</button>
      </form>
    </div>
  )
}
