import WebSocket, { WebSocket as WebSocketClient } from 'ws'

export class WebSocketAdapter {
  private readonly webSocketServer: WebSocket.Server
  private readonly clients = new Set<WebSocketClient>()

  constructor (webSocket: typeof WebSocket, server) {
    this.webSocketServer = new webSocket.Server({ server })

    this.webSocketServer.on('connection', (socket) => {
      this.clients.add(socket)
      console.log('CONNECT')

      socket.on('error', () => {
        console.log('ERROR')
        this.clients.delete(socket)
      })

      socket.on('unexpected-response', () => {
        console.log('ERROR')
        this.clients.delete(socket)
      })

      socket.on('close', () => {
        console.log('CLOSE')
        this.clients.delete(socket)
      })
    })
  }

  sendToAll (message) {
    this.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message)
      }
    })
  }
}
