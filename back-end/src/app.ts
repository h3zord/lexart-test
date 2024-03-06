import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import { loginRouter } from './routes/login'
import { cellphonesRouter } from './routes/cellphones'
import { errorHandler } from './middlewares/errorHandler'
// import cookieParser from 'cookie-parser'

export const app = express()

app.use(express.json())
// app.use(cookieParser())
app.use(cors())

app.use('/login', loginRouter)
app.use('/cellphones', cellphonesRouter)

app.use(errorHandler)
