import express, { NextFunction, Request, Response, Router } from 'express'
import { getLoginController, postLoginController } from '../controller/login'

export const loginRouter: Router = express.Router()

loginRouter.post('/', (req: Request, res: Response, next: NextFunction) =>
  getLoginController(req, res, next),
)

loginRouter.post('/create', (req: Request, res: Response, next: NextFunction) =>
  postLoginController(req, res, next),
)
