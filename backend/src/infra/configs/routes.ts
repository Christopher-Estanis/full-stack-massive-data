import { Express, Router } from 'express'
import http from 'http'
import multer from 'multer'

import { FinancingController } from '../../controllers/v1/FinancingController'
import { MulterAdapter } from '../adapters/MulterAdapter'

export const setupRoutes = (app: Express, server: http.Server): void => {
  const router = Router()
  const multerAdapter = new MulterAdapter(multer)

  const FinancingControllerImpl = new FinancingController(multerAdapter)

  router.use('/financing', FinancingControllerImpl.router())

  app.use(router)
}
