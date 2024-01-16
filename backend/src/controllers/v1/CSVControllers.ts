import { Router } from "express"
import { Controller, Methods } from "../../infra/configs/controller"
import { HttpResponse, ok } from "../../infra/helpers/Http"


type HttpRequest = {
  token: string
}

type Model = {
  accessToken: string
}

export class CSVController extends Controller {
  constructor (router: Router) {
    super(router)
  }

  
  async run () {

    // [POST] Import CSV 
    this.route(Methods.POST, '/', async () => {
      return ok('', {})
    })
  }
}

