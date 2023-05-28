import { Character as TCharacter } from '../../types'

import './main.scss'

type CharacterProps = { character: TCharacter }
export const Character: React.FC<CharacterProps> = ({ character }) => {
  return <div id="character-view"></div>
}
