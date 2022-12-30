const Comment = require('../models/comment.model');

module.exports = {
    async create(data) {
        return await Comment.create(data);
    },

    async getAllByThread(num) {
        return await Comment.findAll({
            where: {
                thread_id: num
            }
        });
    },

    async getOneById(num) {
        return await Comment.findOne({
            where: {
                id: num
            }
        });
    },

    async delete(num) {
        return await Comment.destroy({
            where: {
                id: num
            }
        });
    }
};