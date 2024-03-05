import express from 'express'
import { loginRouter } from './routes/login'
import { cellphonesRouter } from './routes/cellphones'

export const app = express()

app.use(express.json())

app.use('/login', loginRouter)
app.use('/cellphones', cellphonesRouter)
