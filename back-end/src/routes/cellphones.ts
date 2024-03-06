import express, { NextFunction, Request, Response, Router } from 'express'
import { tokenHandler } from '../middlewares/tokenHandler'
import {
  getCellphonesController,
  updateCellphonesController,
} from '../controller/cellphones'

export const cellphonesRouter: Router = express.Router()

// cellphonesRouter.use(tokenHandler)

cellphonesRouter.get('/', (req: Request, res: Response, next: NextFunction) =>
  getCellphonesController(req, res, next),
)

cellphonesRouter.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) =>
    updateCellphonesController(req, res, next),
)
