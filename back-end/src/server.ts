import 'dotenv/config'
import { app } from './app'
import { testConnectionToDB } from './database/config/database'

const port = process.env.PORT || '3000'

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  testConnectionToDB()
})
