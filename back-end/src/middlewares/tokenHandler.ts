import { NextFunction, Request, Response } from 'express'
import { validateJwtToken } from '../utils/auth'

export async function tokenHandler(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const { authorization: token } = req.headers

  if (!token) throw new Error('Token not found')

  validateJwtToken({ token })

  next()
}
