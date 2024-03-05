import { NextFunction, Request, Response } from 'express'

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(404).json({ message: err.message })

  next(err.message)
}
