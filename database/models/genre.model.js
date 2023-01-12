const Sequelize = require('sequelize');
const seq = require('../connection');

const Genre = seq.define('genre', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Genre;
