import express, { NextFunction, Request, Response, Router } from 'express'

export const cellphonesRouter: Router = express.Router()

cellphonesRouter.use((_req: Request, _res: Response, next: NextFunction) => {
  console.log('test')
  next()
})

cellphonesRouter.get('/', (_req: Request, res: Response) => {
  return res.status(200).json({ message: 'OK!' })
})
