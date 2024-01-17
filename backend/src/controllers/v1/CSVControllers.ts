import { Router } from 'express'

import { MulterAdapter } from '../../infra/adapters/MulterAdapter'
import { Controller } from '../../infra/configs/controller'
import { ok } from '../../infra/helpers/Http'

export class CSVController extends Controller {
  DEFAULT_PATH = '/csv'
  multerAdapter: MulterAdapter

  constructor (router: Router, multerAdapter: MulterAdapter) {
    super(router)
    this.multerAdapter = multerAdapter
  }

  setupRoutes () {
    // [POST] Import CSV
    this.router.post(this.path('/'), this.multerAdapter.single('csv'), async (req, res) => this.handle(req, res, async () => {
      // const csvData = req?.file?.buffer?.toString()
      // if (!csvData) return badRequest('')

      // console.log(csvData)

      // const results: Array<any> = []
      // const parser = csvParser()

      // parser.on('data', (data) => {
      //   // Process each row of the CSV as it's parsed
      //   // You can add your custom processing logic here
      //   results.push(data)
      // })

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
    this.router.get(this.path('/'), async (req, res) => this.handle(req, res, async () => {
      return ok('Importação realizada com sucesso!', {})
    }))
  }
}
