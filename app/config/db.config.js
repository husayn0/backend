const { Sequelize } = require('sequelize');
require('dotenv').config();
const fs = require('fs');
const sequelize = new Sequelize(
  {
    dialect: 'mysql',
    host: process.env.DB_HOST || 'db-mysql-ams3-23469-do-user-15814820-0.c.db.ondigitalocean.com',
    port: process.env.DB_PORT || '25060',
    username: process.env.DB_USER || 'doadmin',
    password: process.env.DB_PASSWORD || 'AVNS_AprPukxaOBJfl10VfQK',
    database: process.env.DB_DATABASE || 'defaultdb',
    dialectOptions: {
        ssl: {
            ca: fs.readFileSync('./ca-certificate.crt'),
            rejectUnauthorized: true
        }
    }
});
// (async () => {
//     try {
//       await sequelize.sync({ force: true }); 
//       console.log('Database synchronized successfully');
//     } catch (error) {
//       console.error('Error syncing database:', error);
//     }
//   })();
  
module.exports = sequelize;
