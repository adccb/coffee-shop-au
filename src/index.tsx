import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'

import { App } from './components/'

export const toLocalStorageAt = (s: string) => `@idle-game/${s}`

const getRoot = new Promise<HTMLElement>(res => {
  const node = document.getElementById('root')

  if (node) {
    res(node)
  } else {
    const div = document.createElement('div')
    div.id = 'root'
    document.body.appendChild(div)
    res(div)
  }
})

getRoot.then(root =>
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  ),
)
