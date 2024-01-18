import csvParser from 'csv-parser'
import { Router } from 'express'
import stream from 'stream'

import { CSVStats } from '../../domain/File/CSVStats'
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

      const bufferStream = new stream.PassThrough()
      bufferStream.end(csvData.buffer)
      // console.log(csvData)

      const results: Array<any> = []
      const parser = csvParser()

      parser.on('data', (data) => {
        console.log(data)
      })

      const csvStats = new CSVStats({ error: 0, success: 0, total: 0 })

      bufferStream
        .pipe(csvParser())
        .on('data', (data) => {
          csvStats.addSuccess()
          req.websocketAdapter.sendToAll(csvStats.toMessage)
          // results.push(data);
        })

      // fs.createReadStream(csvData).pipe()
      return ok('test', {})
    }))

    // [GET] Import CSV
    router.get('/', async (req, res) => this.handle(req, res, async () => {
      return ok('Importação realizada com sucesso!', {})
    }))
  }
}
