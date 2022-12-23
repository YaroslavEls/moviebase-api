const Sequelize = require('sequelize');
const seq = require('../connection');

const Comment = seq.define('comment', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    thread_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    reply_to: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true
    }
});

module.exports = Comment;