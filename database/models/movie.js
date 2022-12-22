const Sequelize = require('sequelize');
const seq = require ('../connection');

const Movie = seq.define('Movie', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Movie;