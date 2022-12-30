const ThreadInterface = require('../database/interfaces/thread.interface');

const getAllThreads = async (req, reply) => {
    const data = await ThreadInterface.getAll();
    reply.code(200).send(result);
};

const getOneThread = async (req, reply) => {
    const id = req.params['id'];
    const data = await ThreadInterface.getOneById(id);
    reply.code(200).send(data);
};

const postThread = async (req, reply) => {
    const body = req.body;
    body['movie_name'] = req.params['name'];
    const data = await ThreadInterface.create(params);
    reply.code(201).send(data);
};

const getThreadsByMovie = async (req, reply) => {
    const name = req.params['name'];
    const data = await ThreadInterface.getAllByMovie(name);
    reply.code(200).send(data);
};

module.exports = {
    getAllThreads,
    getOneThread,
    postThread,
    getThreadsByMovie
};