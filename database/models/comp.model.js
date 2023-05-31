const Sequelize = require('sequelize');
const seq = require('../connection.js');

const Compilation = seq.define('compilation', {
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
    desc: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
    },
    user_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Compilation;
