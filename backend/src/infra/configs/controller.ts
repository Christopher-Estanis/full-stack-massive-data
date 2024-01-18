import { Request, Response, Router } from 'express'

import { HttpResponse, successStatusCode } from '../helpers/Http'

export type HandleCallbackResponse = HttpResponse | void
type HandleCallback = (req: Request, res: Response) => Promise<HandleCallbackResponse>

export enum Methods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete'
}

export abstract class Controller {
  protected DEFAULT_PATH: string = ''

  protected abstract setupRoutes (router: Router): void

  protected async handle (req: Request, res: Response, callback: HandleCallback): Promise<Response> {
    try {
      // eslint-disable-next-line n/no-callback-literal
      const result = await callback(req, res)

      return res.status(result?.code ?? 200).json({
        success: successStatusCode(result?.code),
        message: result?.message,
        data: result?.data
      })
    } catch (error: any) {
      console.log(error)
      return res.status(error?.code ?? 500).json({
        success: successStatusCode(error?.code),
        message: error?.message,
        data: error?.data
      })
    }
  }

  public router () {
    const router = Router()

    this.setupRoutes(router)

    return router
  }
}
