const {
    createComment,
    getCommentsByThread
} = require('../database/interfaces/comment')

const postComment = async (req, reply) => {
    const params = req.body;

    params['thread_id'] = +req.params['id'];

    const result = await createComment(params);

    reply.send(result);
}

const getByThread = async (req, reply) => {
    const { id } = req.params;

    const result = await getCommentsByThread(id);

    reply.send(result);
}

module.exports = {
    postComment,
    getByThread
}