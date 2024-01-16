import { ServerError, UnauthorizedError } from "../../exceptions/http"

export type HttpResponse<T = any> = {
  code: number
  data: T
  message: string
}

export const successStatusCode = (code: number) => 200 <= code && 300 >= code 

export const ok = <T = any> (message: string, data: T): HttpResponse<T> => ({
  code: 200,
  data,
  message
})

export const badRequest = (message: string, error: Error): HttpResponse<Error> => ({
  code: 400,
  message,
  data: error
})

export const unauthorized = (): HttpResponse<Error> => ({
  code: 401,
  message: 'Unauthorized',
  data: new UnauthorizedError()
})

export const serverError = (error: Error): HttpResponse<Error> => ({
  code: 500,
  message: 'Server failed. Try again soon',
  data: new ServerError(error)
})