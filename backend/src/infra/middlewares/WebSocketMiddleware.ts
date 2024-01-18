import http from 'http'
import { Server as SocketIoServer } from 'socket.io'

import { WebSocketAdapter } from '../adapters/WebSocketAdapter'

export const WebSocketMiddleware = (server: http.Server) => {
  const webSocketAdapter = new WebSocketAdapter(server)
  return (req, res, next) => {
    req.websocketAdapter = webSocketAdapter
    next()
  }
}
