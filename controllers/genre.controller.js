const GenreInterface = require('../database/interfaces/genre.interface.js');

const getAllGenres = async (req, reply) => {
    const data = await GenreInterface.getAll();
    reply.code(200).send(data);
};

const getOneGenre = async (req, reply) => {
    const id = parseInt(req.params['id']);
    const data = await GenreInterface.getOneById(id);
    reply.code(200).send(data);
};

const postGenre = async (req, reply) => {
    const body = req.body;
    const data = await GenreInterface.create(body);
    reply.code(201).send(data);
};

const deleteGenre = async (req, reply) => {
    const id = parseInt(req.params['id']);
    await GenreInterface.delete(id);
    reply.code(204).send({ message: `item ${id} has been deleted` });
};

module.exports = {
    getAllGenres,
    getOneGenre,
    postGenre,
    deleteGenre
};
