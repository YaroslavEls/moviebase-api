const Compilation = require('../models/comp.model.js');

module.exports = {
    async create(data) {
        return await Compilation.create(data);
    },

    async getAll() {
        return await Compilation.findAll();
    },

    async getOneById(num) {
        return await Compilation.findByPk(num);
    },

    async getOwner(num) {
        return await Compilation.findOne({
            where: {
                id: num
            },
            attributes: ['user_id']
        });
    },

    async delete(num) {
        return await Compilation.destroy({
            where: {
                id: num
            }
        });
    },

    async update(num, data) {
        return await Compilation.update(data, {
            where: {
                id: num
            }
        });
    }
};
