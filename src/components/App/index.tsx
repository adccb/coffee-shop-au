import { useMachine } from '@xstate/react'

import { useCharacter } from '../../hooks'
import Cafe from '../Cafe'
import { Bank } from '../Bank'
import { Setup } from '../Setup'
import { machine, clockIn } from '../../machines/Cafe'

import './main.scss'

type AppProps = {}

export const App: React.FC<AppProps> = () => {
  const [state, send] = useMachine(machine)
  const [character, setCharacter] = useCharacter()

  if (!Object.values(character).every(Boolean))
    return <Setup character={character} save={setCharacter} />

  return (
    <div id="app">
      <Cafe clockIn={() => send(clockIn())} context={state.context} />

      <section id="main-content">
        <Bank context={state.context} />
      </section>
    </div>
  )
}
