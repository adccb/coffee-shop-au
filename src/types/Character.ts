type CharacterName = string
type CharacterGender = string
type CharacterSpecies = string
type CharacterClass = string

export type Character = {
  type: 'character'
  name: CharacterName
  gender: CharacterGender
  species: CharacterSpecies
  characterClass: CharacterClass
}

export const character = (c: Omit<Character, 'type'>): Character => ({
  ...c,
  type: 'character',
})

export const defaultCharacter: Character = character({
  name: '',
  gender: '',
  species: '',
  characterClass: '',
})
