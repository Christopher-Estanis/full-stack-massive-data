import cors from 'cors'
import express, { Express } from 'express'
import http from 'http'

import { WebSocketMiddleware } from '../middlewares/WebSocketMiddleware'

export const setupMiddlewares = (app: Express, server: http.Server) => {
  app.use(cors())
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())
  app.use(WebSocketMiddleware(server))
}
