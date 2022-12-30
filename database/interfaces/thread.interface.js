const Thread = require('../models/thread.model');

module.exports = {
    async create(data) {
        return await Thread.create(data);
    },

    async getAll() {
        return await Thread.findAll();
    },

    async getOneById(num) {
        return await Thread.findOne({
            where: {
                id: num
            }
        });
    },

    async getAllByMovie(str) {
        return await Thread.findAll({
            where: {
                movie_name: str
            }
        });
    }
};