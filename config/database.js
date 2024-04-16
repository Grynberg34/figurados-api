const { Sequelize } = require('sequelize');
require('dotenv').config();

var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {

  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: 25060,
  define: {
    timestamps: false
  },
  dialectOptions: {
    ssl: {
    require: true,
    rejectUnauthorized: false 
    }
  }
})

sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error(err);
});

module.exports = sequelize;