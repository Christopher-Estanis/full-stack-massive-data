import express, { Express, json } from 'express'

import cors from 'cors'

export const setupMiddlewares = (app: Express) => {
  app.use(cors())
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())
}