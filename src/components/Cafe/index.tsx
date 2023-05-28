import Menu from '../Menu'

import { Context } from '../../machines/Cafe/'

import './main.scss'

type CafeProps = {
  context: Context
  clockIn: () => void
}

const Cafe: React.FC<CafeProps> = ({ clockIn, context }) => {
  return (
    <aside id="cafe">
      <div>
        <button onClick={clockIn}>clock in</button>

        <Menu context={context} />
      </div>
    </aside>
  )
}

export default Cafe
