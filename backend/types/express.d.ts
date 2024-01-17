import { WebSocketAdapter } from '../src/infra/adapters/WebSocketAdapter'

declare global {
  namespace Express {
    interface Request {
      websocketAdapter: WebSocketAdapter
    }
  }
}
