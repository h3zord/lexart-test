import 'dotenv/config'
import { Options } from 'sequelize'

const config: Options = {
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DATABASE as string,
  host: process.env.POSTGRES_HOST as string,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
    },
    schema: 'public',
  },
}

module.exports = config
