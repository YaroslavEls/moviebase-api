const CompInterface = require('../database/interfaces/comp.interface.js');

const getAllComps = async (req, reply) => {
    const data = await CompInterface.getAll();
    reply.code(200).send(data);
};

const getOneComp = async (req, reply) => {
    const id = parseInt(req.params['id']);
    const data = await CompInterface.getOneById(id);
    reply.code(200).send(data);
};

const postComp = async (req, reply) => {
    const { title, desc } = req.body;
    const user_id = req.user['user_id'];

    const params = { title, desc, user_id };
    const data = await CompInterface.create(params);
    reply.code(201).send(data);
};

const deleteComp = async (req, reply) => {
    const id = parseInt(req.params['id']);
    const owner = await CompInterface.getOwner(id);

    if (owner.user_id != req.user['user_id']) {
        return reply.code(403).send({ message: 'Permission denied' });
    }

    await CompInterface.delete(id);
    reply.code(204).send({ message: `item ${id} has been deleted` });
};

const updateComp = async (req, reply) => {
    const id = parseInt(req.params['id']);
    const owner = await CompInterface.getOwner(id);

    if (owner.user_id != req.user['user_id']) {
        return reply.code(403).send({ message: 'Permission denied' });
    }

    const body = req.body;
    const data = await CompInterface.update(id, body);
    reply.code(204).send(data);
};

const addMovieComp = async (req, reply) => {
    const id = parseInt(req.params['comp_id']);
    const owner = await CompInterface.getOwner(id);

    if (owner.user_id != req.user['user_id']) {
        return reply.code(403).send({ message: 'Permission denied' });
    }

    const comp_id = parseInt(req.params['comp_id']);
    const movie_id = parseInt(req.params['movie_id']);
    const data = await CompInterface.addMovie(comp_id, movie_id);
    reply.code(201).send(data);
};

const removeMovieComp = async (req, reply) => {
    const id = parseInt(req.params['comp_id']);
    const owner = await CompInterface.getOwner(id);

    if (owner.user_id != req.user['user_id']) {
        return reply.code(403).send({ message: 'Permission denied' });
    }

    const comp_id = parseInt(req.params['comp_id']);
    const movie_id = parseInt(req.params['movie_id']);
    const data = await CompInterface.removeMovie(comp_id, movie_id);
    reply.code(204).send(data);
};

module.exports = {
    getAllComps,
    getOneComp,
    postComp,
    deleteComp,
    updateComp,
    addMovieComp,
    removeMovieComp
};
