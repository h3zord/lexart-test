import express, { NextFunction, Request, Response, Router } from 'express'

export const loginRouter: Router = express.Router()

loginRouter.use((_req: Request, _res: Response, next: NextFunction) => {
  console.log('test')
  next()
})

loginRouter.get('/', (_req: Request, res: Response) => {
  return res.status(200).json({ message: 'OK!' })
})
