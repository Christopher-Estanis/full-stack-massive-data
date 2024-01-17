import express from 'express'
import http from 'http'

import { setupRoutes } from './infra/configs/routes'
import { setupMiddlewares } from './infra/configs/setupMiddleware'

const app = express()
const server = http.createServer(app)

setupMiddlewares(app, server)
setupRoutes(app, server)

export default server
