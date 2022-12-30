const MovieInterface = require('../database/interfaces/movie.interface');

const getAllMovies = async (req, reply) => {
    const data = await MovieInterface.getAll();
    reply.code(200).send(data);
};

const getOneMovie = async (req, reply) => {
    const name = req.params['name'];
    const data = await MovieInterface.getOneByName(name);
    reply.code(200).send(data);
};

const postMovie = async (req, reply) => {
    const body = req.body;
    await MovieInterface.create(body);
    reply.code(201).send(body);
};

const deleteMovie = async (req, reply) => {
    const id = req.params['id'];
    await MovieInterface.delete(id);
    reply.code(204).send({message: `item ${id} has been deleted`});
};

const updateMovie = async (req, reply) => {
    const id = req.params['id'];
    const body = req.body;
    await MovieInterface.update(id, body);
    reply.code(200).send({message: `item ${id} has been updated`})
};

const getMoviesByGenre = async (req, reply) => {
    const id = req.params['id'];
    const data = await MovieInterface.getAllByGenre(id);
    reply.code(200).send(data);
};

module.exports = {
    getAllMovies,
    getOneMovie,
    postMovie,
    deleteMovie,
    updateMovie,
    getMoviesByGenre
};