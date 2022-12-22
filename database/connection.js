const { Sequelize } = require('sequelize');

const seq = new Sequelize({
    dialect: 'sqlite',
    storage: './database/data.db'
});

module.exports = seq;