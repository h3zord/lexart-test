import express, { NextFunction, Request, Response, Router } from 'express'
import { tokenHandler } from '../middlewares/tokenHandler'
import { getCellphonesController } from '../controller/cellphones'

export const cellphonesRouter: Router = express.Router()

// cellphonesRouter.use(tokenHandler)

cellphonesRouter.get('/', (req: Request, res: Response, next: NextFunction) =>
  getCellphonesController(req, res, next),
)
