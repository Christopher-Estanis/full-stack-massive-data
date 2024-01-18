import csvParser from 'csv-parser'
import { Router } from 'express'

import { MulterAdapter } from '../../infra/adapters/MulterAdapter'
import { Controller } from '../../infra/configs/controller'
import { badRequest, ok } from '../../infra/helpers/Http'

export class FinancingController extends Controller {
  DEFAULT_PATH = '/csv'
  multerAdapter: MulterAdapter

  constructor (multerAdapter: MulterAdapter) {
    super()
    this.multerAdapter = multerAdapter
  }

  setupRoutes (router: Router) {
    // [POST] Import CSV
    router.post('/import', this.multerAdapter.single('csv'), async (req, res) => this.handle(req, res, async () => {
      const csvData = req?.file

      console.log(csvData)
      if (!csvData) return badRequest('')

      // console.log(csvData)

      const results: Array<any> = []
      const parser = csvParser()

      parser.on('data', (data) => {
        console.log(data)
      })

      // parser.on('end', () => {
      //   // All rows parsed, now you can do additional processing if needed
      //   // For example, you can manipulate 'results' array

      //   // Send the processed data to the client
      //   return res.json(results)
      // })

      // parser.on('error', (err) => {
      //   console.error('Error parsing CSV:', err)
      //   res.status(500).send('Internal Server Error')
      // })

      req.websocketAdapter.sendToAll('Hello, clients!')

      // fs.createReadStream(csvData).pipe()
      return ok('test', {})
    }))

    // [GET] Import CSV
    router.get('/', async (req, res) => this.handle(req, res, async () => {
      return ok('Importação realizada com sucesso!', {})
    }))
  }
}
