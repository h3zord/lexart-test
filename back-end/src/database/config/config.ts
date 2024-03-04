import 'dotenv/config'
import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(process.env.CONNECT_TO_DB_URL as string)

export async function test() {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
