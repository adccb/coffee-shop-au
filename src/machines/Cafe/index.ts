import { createMachine } from 'xstate'

import { Event, eventNames } from './events'
import { states } from './states'
import { Context, defaultContext, tick } from './context'

export const machine = createMachine<Context, Event>(
  {
    id: 'cafe-machine',
    predictableActionArguments: true,
    context: defaultContext,
    initial: states.idle,
    schema: {
      context: defaultContext as Context,
    },
    states: {
      [states.idle]: {
        on: {
          [eventNames.clockIn]: {
            target: states.working,
          },
          [eventNames.priceChange]: {
            actions: console.log,
          },
        },
      },
      [states.working]: {
        invoke: {
          src: 'wait',
          onDone: { target: states.idle, actions: ['tick'] },
        },
      },
    },
  },
  {
    actions: { tick },
    services: {
      wait: () => new Promise(res => setTimeout(res, 5000)),
    },
  },
)

export * from './context'
export * from './events'
export * from './states'
