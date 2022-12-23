const {
    createMovie, 
    getMovies, 
    getMovieByName,
    destroyMovie,
    refreshMovie
} = require('../database/interfaces/movie')

const getAllMovies = async (req, reply) => {
    const result = await getMovies();
    reply.send(result);
}

const getMovie = async (req, reply) => {
    const { name } = req.params;

    const data = await getMovieByName(name)

    reply.send(data);
}

const postMovie = async (req, reply) => {
    const params = req.body;

    await createMovie(params);

    reply.code(201).send(params)
}

const deleteMovie = async (req, reply) => {
    const { id } = req.params;

    await destroyMovie(id);

    reply.send({message: `item ${id} has been deleted`})
}

const updateMovie = async (req, reply) => {
    const { id } = req.params;
    const params = req.body;

    await refreshMovie(id, params);

    reply.send({message: `item ${id} has been updated`})
}

module.exports = {
    getAllMovies,
    getMovie,
    postMovie,
    deleteMovie,
    updateMovie
}