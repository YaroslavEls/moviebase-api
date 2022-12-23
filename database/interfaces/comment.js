const Comment = require('../models/comment');

module.exports = {
    async createComment(data) {
        return await Comment.create(data);
    },

    async getCommentsByThread(num) {
        return await Comment.findAll({
            where: {
                thread_id: num
            }
        });
    }
}