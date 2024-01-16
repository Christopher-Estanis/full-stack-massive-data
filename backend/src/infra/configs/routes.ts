import { Router, Express } from 'express'
import { CSVController } from '../../controllers/v1/CSVControllers'

export const setupRoutes = (app: Express): void => {
  const router = Router()

  const CSVControllerImpl = new CSVController(router)
  CSVControllerImpl.run()


  app.use(router)
}