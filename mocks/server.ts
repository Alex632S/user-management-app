import { setupServer } from 'msw/node'
import { userHandlers } from './handlers/users'

export const server = setupServer(...userHandlers)

// [MermaidChart: 2d28c123-9613-48ff-b430-0bbfe8f9a0a9]
