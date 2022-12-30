const Sequelize = require('sequelize');
const seq = require('../connection');

const User = seq.define('user', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    name: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: "default"
    }
});

module.exports = User;