const Genre = require('../models/genre.model');

module.exports = {
    async create(data) {
        return await Genre.create(data);
    },

    async getAll() {
        return await Genre.findAll();
    },

    async delete(num) {
        return await Genre.destroy({
            where: {
                id: num
            }
        });
    }
};
