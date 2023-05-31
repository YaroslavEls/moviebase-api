const Thread = require('../models/thread.model.js');
const Comment = require('../models/comment.model.js');

module.exports = {
    async create(data) {
        return await Thread.create(data);
    },

    async getAll() {
        return await Thread.findAll({
            include: {
                model: Comment, 
                as: 'comments'
            }
        });
    },

    async getOneById(num) {
        return await Thread.findOne({
            where: {
                id: num
            },
            include: {
                model: Comment, 
                as: 'comments'
            }
        });
    },

    async getAllByMovie(str) {
        return await Thread.findAll({
            where: {
                movie_name: str
            },
            include: {
                model: Comment, 
                as: 'comments'
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
