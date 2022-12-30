const User = require('../models/user');

module.exports = {
    async createUser(data) {
        return await User.create(data);
    },

    async getUsers() {
        return await User.findAll();
    },

    async getUserByName(str) {
        return User.findOne({
            where: {
                name: str
            }
        });
    }
}