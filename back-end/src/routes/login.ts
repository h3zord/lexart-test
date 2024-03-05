import express, { NextFunction, Request, Response, Router } from 'express'
import { getLoginController } from '../controller/login'

export const loginRouter: Router = express.Router()

loginRouter.use((_req: Request, _res: Response, next: NextFunction) => {
  console.log('test')
  next()
})

loginRouter.get('/', (req: Request, res: Response) =>
  getLoginController(req, res),
)
