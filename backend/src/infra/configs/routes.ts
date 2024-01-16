import { Router, Express } from 'express'

export const setupRoutes = (app: Express): void => {
  const router = Router()

  router.post('/csv', (request, response) => {
    
  })

  app.use(router)
}