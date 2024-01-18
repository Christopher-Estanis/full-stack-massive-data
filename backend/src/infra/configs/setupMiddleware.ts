import express, { Express } from 'express'
import http from 'http'

import { WebSocketMiddleware } from '../middlewares/WebSocketMiddleware'

export const setupMiddlewares = (app: Express, server: http.Server) => {
  // app.use(cors({ origin: 'http://localhost:3000' }))
  app.use(WebSocketMiddleware(server))
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())
}
