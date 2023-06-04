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
        await Thread.destroy({
            where: {
                id: num
            }
        });

        return;
    },

    async postComment(data) {
        await Comment.create(data);

        return Thread.findByPk(data['thread_id'], {
            include: {
                model: Comment,
                as: 'comments'
            }
        });
    },

    async getCommentById(num) {
        return await Comment.findByPk(num);
    },

    async deleteComment(num) {
        const comment = await Comment.findByPk(num);

        const thread_id = comment['thread_id'];

        await comment.destroy();

        return Thread.findByPk(thread_id, {
            include: {
                model: Comment,
                as: 'comments'
            }
        });
    }
};
