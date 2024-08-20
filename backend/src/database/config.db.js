import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'mysql-container',
    port: 3306,
    dialect: 'mysql'
  }
)

export default db
