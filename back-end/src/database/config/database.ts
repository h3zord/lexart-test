import 'dotenv/config'
import { Sequelize } from 'sequelize'
import * as config from './config'

export const sequelize = new Sequelize(config)

export async function testConnectionToDB() {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
