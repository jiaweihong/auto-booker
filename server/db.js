const Pool = require("pg").Pool
require('dotenv').config();


const developmentConfig = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE
}

const productionConfig = {
    connectionString: process.env.DATABASE_URL,
    logging: false,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
}

const pool = new Pool(process.env.NODE_ENV === "production" ? productionConfig : developmentConfig)

module.exports = pool;