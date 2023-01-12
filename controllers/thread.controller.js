const ThreadInterface = require('../database/interfaces/thread.interface');

const getAllThreads = async (req, reply) => {
    const data = await ThreadInterface.getAll();
    reply.code(200).send(data);
};

const getOneThread = async (req, reply) => {
    const id = req.params['id'];
    const data = await ThreadInterface.getOneById(id);
    reply.code(200).send(data);
};

const postThread = async (req, reply) => {
    let token;
    try {
        token = await req.jwtVerify();
    } catch (err) {
        return reply.send(err);
    }

    const body = req.body;
    body['user_id'] = token['user_id'];
    body['movie_name'] = req.params['name'];
    const data = await ThreadInterface.create(body);
    reply.code(201).send(data);
};

const getThreadsByMovie = async (req, reply) => {
    const name = req.params['name'];
    const data = await ThreadInterface.getAllByMovie(name);
    reply.code(200).send(data);
};

const deleteThread = async (req, reply) => {
    const id = req.params['id'];
    const thread = await ThreadInterface.getOneById(id);
    const requiredRole = 'admin';
    let token;
    try {
        token = await req.jwtVerify();
    } catch (err) {
        return reply.send(err);
    }

    const cond1 = (token['user_id'] === thread.user_id);
    const cond2 = (token['role'] === requiredRole);
    if (!cond1 && !cond2) {
        return reply.code(403).send({ message: 'Permission denied' });
    }

    await ThreadInterface.delete(id);
    reply.code(200).send({ message: `thread ${id} has been deleted` });
};

module.exports = {
    getAllThreads,
    getOneThread,
    postThread,
    getThreadsByMovie,
    deleteThread
};
