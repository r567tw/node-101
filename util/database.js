const Sequelize = require('sequelize');

const sequelize = new Sequelize('node', 'node', 'node', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
