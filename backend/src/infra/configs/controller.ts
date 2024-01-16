import express, { Router } from 'express'
import { HttpResponse, serverError } from "../helpers/Http"

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

  protected route (method: Methods, path: string, callback: HandleCallback) {
    this.router[method](path, (req, res) => this.handle({ ...req.query, ...req.body, ...req.params }, callback))
  }

  private async handle (httpRequest: any, callback: HandleCallback): Promise<HttpResponse> {
    // const error = this.validate(httpRequest)
    // if (error !== undefined) {
    //   return badRequest(error)
    // }

    try {
      return await callback(httpRequest)
    } catch (error: any) {
      return serverError(error)
    }
  }
}