import Sequelize from 'sequelize';
import dotenv from 'dotenv'

dotenv.config({path: '.env'})

const db = new Sequelize(process.env.BD_NAME, 
      process.env.BD_DATABASE, process.env.BD_PASS,
   {
      host: process.env.BD_HOST,
      dialect: 'mysql',
      port: 3306,
      operatorsAliases: false,
      define: {
         timestamps: false
      },

      pool:{
         max: 5,
         min: 0,
         acquire: 30000,
         idle: 10000
      },
      operatorsAliases: false

   });

   export default db;