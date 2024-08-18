import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const db = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASS,
  {
    host: 'mysql-container',
    port: 3306,
    dialect: 'mysql'
  }
)

export default db
