const Thread = require('../models/thread.model');
const Comment = require('../models/comment.model');

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
            },
            include: {
                model: Comment, as: 'comments'
            }
        });
    },

    async getAllByMovie(str) {
        return await Thread.findAll({
            where: {
                movie_name: str
            }
        });
    },

    async delete(num) {
        return await Thread.destroy({
            where: {
                id: num
            }
        });
    }
};
