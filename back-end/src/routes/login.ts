import express, { NextFunction, Request, Response, Router } from 'express'
import { getLoginController, postLoginController } from '../controller/login'
import { tokenHandler } from '../middlewares/tokenHandler'

export const loginRouter: Router = express.Router()

loginRouter.post('/', (req: Request, res: Response, next: NextFunction) =>
  getLoginController(req, res, next),
)

loginRouter.use(tokenHandler)

loginRouter.post('/create', (req: Request, res: Response, next: NextFunction) =>
  postLoginController(req, res, next),
)
