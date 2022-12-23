const {
    createThread,
    getThreads,
    getThread,
    getThreadsByMovie
} = require('../database/interfaces/thread')

const getAllThreads = async (req, reply) => {
    const result = await getThreads();

    reply.send(result);
}

const getOneThread = async (req, reply) => {
    const { id } = req.params;

    const result = await getThread(id);

    reply.send(result);
}

const postThread = async (req, reply) => {
    const params = req.body;
    
    params['movie_name'] = req.params['name'];

    const result = await createThread(params);

    reply.send(result);
}

const getByMovie = async (req, reply) => {
    const { name } = req.params;

    console.log(name);

    const result = await getThreadsByMovie(name);

    reply.send(result);
}

module.exports = {
    getAllThreads,
    getOneThread,
    postThread,
    getByMovie
}