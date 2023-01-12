const Sequelize = require('sequelize');
const seq = require('../connection');

const Thread = seq.define('thread', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    text: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    movie_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Thread;
