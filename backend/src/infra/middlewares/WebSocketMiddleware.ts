import WebSocket from 'ws'

import { WebSocketAdapter } from '../adapters/WebSocketAdapter'

export const WebSocketMiddleware = (server) => {
  const webSocketAdapter = new WebSocketAdapter(WebSocket, server)

  return (req, res, next) => {
    req.websocketAdapter = webSocketAdapter
    next()
  }
}
