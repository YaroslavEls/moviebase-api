const User = require('../models/user.model');

module.exports = {
    async create(data) {
        return await User.create(data);
    },

    async getAll() {
        return await User.findAll();
    },

    async getOneByName(str) {
        return User.findOne({
            where: {
                name: str
            }
        });
    }
};