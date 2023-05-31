const Comment = require('../models/comment.model.js');

module.exports = {
    async create(data) {
        return await Comment.create(data);
    },

    async getOneById(num) {
        return await Comment.findByPk(num);
    },

    async delete(num) {
        return await Comment.destroy({
            where: {
                id: num
            }
        });
    }
};
