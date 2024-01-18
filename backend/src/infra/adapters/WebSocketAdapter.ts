import http from 'http'
import { Server as SocketIoServer, Socket } from 'socket.io'

export class WebSocketAdapter {
  private readonly io: SocketIoServer

  constructor (server: http.Server) {
    this.io = new SocketIoServer(server, {
      cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
      }
    })

    this.io.on('connection', (socket: Socket) => {
      console.log('CONNECT')

      socket.on('disconnect', () => {
        console.log('DISCONNECT')
      })

      socket.on('error', (err) => {
        console.log('ERROR:', err)
      })
    })
  }

  sendToAll (message) {
    this.io.emit('message', message)
  }
}
