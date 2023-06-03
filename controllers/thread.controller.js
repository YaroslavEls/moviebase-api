const ThreadInterface = require('../database/interfaces/thread.interface.js');

const getAllThreads = async (req, reply) => {
    const data = await ThreadInterface.getAll();
    reply.code(200).send(data);
};

const getOneThread = async (req, reply) => {
    const id = parseInt(req.params['id']);
    const data = await ThreadInterface.getOneById(id);
    reply.code(200).send(data);
};

const postThread = async (req, reply) => {
    const { title, text, is_review } = req.body;
    const user_id = req.user['user_id'];
    const movie_name = req.params['name'];

    const params = { title, text, is_review, user_id, movie_name };
    const data = await ThreadInterface.create(params);
    reply.code(201).send(data);
};

const getThreadsByMovie = async (req, reply) => {
    const name = req.params['name'];
    const data = await ThreadInterface.getAllByMovie(name);
    reply.code(200).send(data);
};

const deleteThread = async (req, reply) => {
    const id = parseInt(req.params['id']);
    const thread = await ThreadInterface.getOneById(id);
    const requiredRole = 'admin';

    const cond1 = (req.user['user_id'] === thread.user_id);
    const cond2 = (req.user['role'] === requiredRole);
    if (!cond1 && !cond2) {
        return reply.code(403).send({ message: 'Permission denied' });
    }

    await ThreadInterface.delete(id);
    reply.code(204).send({ message: `thread ${id} has been deleted` });
};

const postThreadComment = async (req, reply) => {
    const { text } = req.body;
    const user_id = req.user['user_id'];
    const thread_id = parseInt(req.params['id']);

    const params = { text, user_id, thread_id };
    const data = await ThreadInterface.postComment(params);
    reply.code(201).send(data);
};

const deleteThreadComment = async (req, reply) => {
    const id = parseInt(req.params['id']);
    const comment = await ThreadInterface.getCommentById(id);
    const requiredRole = 'admin';

    const cond1 = (req.user['user_id'] === comment.user_id);
    const cond2 = (req.user['role'] === requiredRole);
    if (!cond1 && !cond2) {
        return reply.code(403).send({ message: 'Permission denied' });
    }

    const data = await ThreadInterface.deleteComment(id);
    reply.code(204).send(data);
};

module.exports = {
    getAllThreads,
    getOneThread,
    postThread,
    getThreadsByMovie,
    deleteThread,
    postThreadComment,
    deleteThreadComment
};
