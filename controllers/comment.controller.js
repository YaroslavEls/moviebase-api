const CommentInterface = require('../database/interfaces/comment.interface.js');

const postComment = async (req, reply) => {
    let token;
    try {
        token = await req.jwtVerify();
    } catch (err) {
        return reply.send(err);
    }

    const { text } = req.body;
    const user_id = token['user_id'];
    const thread_id = parseInt(req.params['id']);

    const params = { text, user_id, thread_id };
    const data = await CommentInterface.create(params);
    reply.code(201).send(data);
};

const deleteComment = async (req, reply) => {
    const id = parseInt(req.params['id']);
    const comment = await CommentInterface.getOneById(id);
    const requiredRole = 'admin';
    let token;
    try {
        token = await req.jwtVerify();
    } catch (err) {
        return reply.send(err);
    }

    const cond1 = (token['user_id'] === comment.user_id);
    const cond2 = (token['role'] === requiredRole);
    if (!cond1 && !cond2) {
        return reply.code(403).send({ message: 'Permission denied' });
    }

    await CommentInterface.delete(id);
    reply.code(200).send({ message: `comment ${id} has been deleted` });
};

module.exports = {
    postComment,
    deleteComment
};
