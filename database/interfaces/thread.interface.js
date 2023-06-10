const Thread = require('../models/thread.model.js');
const Comment = require('../models/comment.model.js');

module.exports = {
    async create(data) {
        return await Thread.create(data);
    },

    async getAll() {
        return await Thread.findAll({
            include: [
                { model: Comment, as: 'comments' }
            ]
        });
    },

    async getOneById(num) {
        return await Thread.findByPk(num, {
            include: [
                { model: Comment, as: 'comments' }
            ]
        });
    },

    async getAllByMovie(str) {
        return await Thread.findAll({
            where: {
                movie_name: str
            },
            include: [
                { model: Comment, as: 'comments' }
            ]
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
        return await this.getOneById(data['thread_id']);
    },

    async getCommentById(num) {
        return await Comment.findByPk(num);
    },

    async deleteComment(num) {
        const comment = await Comment.findByPk(num);
        const thread_id = comment['thread_id'];
        await comment.destroy();
        return await this.getOneById(thread_id);
    }
};
