const CommentInterface = require('../database/interfaces/comment.interface');

const postComment = async (req, reply) => {
    let token;
    try {
        token = await req.jwtVerify();
    } catch (err) {
        return reply.send(err);
    }
    
    const body = req.body;
    body['user_id'] = token['user_id'];
    body['thread_id'] = +req.params['id'];
    const data = await CommentInterface.create(body);
    reply.code(201).send(data);
};

const deleteComment = async (req, reply) => {
    const id = req.params['id'];
    const comment = await CommentInterface.getOneById(id);
    const requiredRole = 'admin';
    let token;
    try {
        token = await req.jwtVerify();
    } catch (err) {
        return reply.send(err);
    }

    cond1 = ( token['user_id'] == comment.user_id );
    cond2 = ( token['role'] == requiredRole );
    if (!cond1 && !cond2) {
        return reply.code(403).send({message: 'Permission denied'});
    }

    await CommentInterface.delete(id);
    reply.code(200).send({message: `comment ${id} has been deleted`});
};

module.exports = {
    postComment,
    deleteComment
};