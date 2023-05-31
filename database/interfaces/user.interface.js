const User = require('../models/user.model.js');
const Compilation = require('../models/comp.model.js');

module.exports = {
    async create(data) {
        return await User.create(data);
    },

    async getAll() {
        return await User.findAll({
            include: [
                { model: Compilation, as: 'compilations' },
                { model: User, as: 'followers' },
                { model: User, as: 'followings' }
            ]
        });
    },

    async getOneById(num) {
        return await User.findOne({
            where: {
                id: num
            },
            include: [
                { model: Compilation, as: 'compilations' },
                { model: User, as: 'followers' },
                { model: User, as: 'followings' }
            ]
        });
    },

    async getOneByName(str) {
        return await User.findOne({
            where: {
                name: str
            }
        });
    },

    async postFollow(num1, num2) {
        const user = await User.findByPk(num1);
        await user.addFollowing(num2);
        return user;
    },

    async deleteFollow(num1, num2) {
        const user = await User.findByPk(num1);
        await user.removeFollowing(num2);
        return user;
    }
};
