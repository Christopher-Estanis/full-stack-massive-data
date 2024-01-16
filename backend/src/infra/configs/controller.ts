import express, { Router, Response, Request } from 'express'
import { HttpResponse, serverError, successStatusCode } from "../helpers/Http"

type HandleCallback = (httpRequest: any) => Promise<HttpResponse>

export enum Methods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete'
}

export abstract class Controller {
  constructor (private readonly router: Router) {}

  public abstract run (): void
  public abstract DEFAULT_PATH: string

  protected route (method: Methods, path: string, callback: HandleCallback) {
    this.router[method](this.DEFAULT_PATH + path, (req, res) => this.handle(req, res, callback))
  }

  private async handle (req: Request, res: Response, callback: HandleCallback): Promise<Response> {
    try {
      const { code, data, message } = await callback({ ...req.query, ...req.body, ...req.params })
      
      return res.status(code).json({
        success: successStatusCode(code),
        message,
        data
      })
    } catch (error: any) {
      return res.status(error.code).json({
        success: successStatusCode(error.code),
        message: error.message,
        data: error.data
      })
    }
  }
}