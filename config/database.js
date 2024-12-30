const { Sequelize } = require('sequelize');
require('dotenv').config();

var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {

  host: process.env.DB_HOST,
  dialect: 'mysql',
  define: {
    timestamps: false
  },
})

sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error(err);
});

module.exports = sequelize;