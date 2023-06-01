const Sequelize = require('sequelize');
const seq = require('../connection.js');

const Rating = seq.define('rating', {
    movie_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    score: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 10
        }
    }
});

module.exports = Rating;
