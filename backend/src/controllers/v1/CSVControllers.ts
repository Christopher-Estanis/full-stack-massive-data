import { Router } from "express"
import { Controller, Methods } from "../../infra/configs/controller"
import { HttpResponse, ok } from "../../infra/helpers/Http"

export class CSVController extends Controller {
  DEFAULT_PATH = '/csv'
  
  constructor (router: Router) {
    super(router)
  }
  
  async run () {

    // [POST] Import CSV 
    this.route(Methods.POST, '/', async () => {
      return ok('', {})
    })

    // [GET] Import CSV 
    this.route(Methods.GET, '/', async () => {
      return ok('Importação realizada com sucesso!', {})
    })
  }
}