import { Express, Router } from 'express'
import http from 'http'
import multer from 'multer'

import { CSVController } from '../../controllers/v1/CSVControllers'
import { MulterAdapter } from '../adapters/MulterAdapter'

export const setupRoutes = (app: Express, server: http.Server): void => {
  const router = Router()
  const multerAdapter = new MulterAdapter(multer)

  const CSVControllerImpl = new CSVController(router, multerAdapter)
  CSVControllerImpl.setupRoutes()

  app.use(router)
}
