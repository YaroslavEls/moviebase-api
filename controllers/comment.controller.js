const CommentInterface = require('../database/interfaces/comment.interface');

const postComment = async (req, reply) => {
    try {
        const token = await req.jwtVerify();
    } catch (err) {
        reply.send(err);
    }
    
    const body = req.body;
    body['thread_id'] = +req.params['id'];
    const data = await CommentInterface.create(body);
    reply.code(201).send(data);
};

const getCommentsByThread = async (req, reply) => {
    const id = req.params['id'];
    const data = await CommentInterface.getAllByThread(id);
    reply.code(200).send(data);
};

module.exports = {
    postComment,
    getCommentsByThread
};