import 'dotenv/config'
import { app } from './app'
import { testConnectionToDB } from './database/config/database'
import { createJwtToken } from './utils/auth'

const port = process.env.PORT || '3000'

const token = createJwtToken({
  fullName: 'Lucas Chavarem',
  email: 'test@test.com',
  accountType: 'user',
})

console.log(token)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  testConnectionToDB()
})
