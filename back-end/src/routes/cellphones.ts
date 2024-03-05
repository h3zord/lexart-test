import express, { Request, Response, Router } from 'express'
import { tokenHandler } from '../middlewares/tokenHandler'

export const cellphonesRouter: Router = express.Router()

cellphonesRouter.use(tokenHandler)

cellphonesRouter.get('/', (_req: Request, res: Response) => {
  return res.status(200).json({ message: 'OK!' })
})
