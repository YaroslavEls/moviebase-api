require('dotenv').config();
const { Sequelize } = require('sequelize');

const seq = new Sequelize({
    dialect: process.env.DB_DIALECT,
    storage: process.env.DB_STORAGE,
    logging: false
});

seq.query(process.env.DB_REL_QUERY);

module.exports = seq;
