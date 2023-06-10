const MovieInterface = require('../database/interfaces/movie.interface.js');

const getAllMovies = async (req, reply) => {
    const data = await MovieInterface.getAll();
    reply.code(200).send(data);
};

const getOneMovie = async (req, reply) => {
    const name = req.params['name'];
    const user_id = req.user ? req.user['user_id'] : false;
    const data = await MovieInterface.getOneByName(name, user_id);
    reply.code(200).send(data);
};

const postMovie = async (req, reply) => {
    const body = req.body;
    const data = await MovieInterface.create(body);
    reply.code(201).send(data);
};

const deleteMovie = async (req, reply) => {
    const id = parseInt(req.params['id']);
    await MovieInterface.delete(id);
    reply.code(204).send({ message: `item ${id} has been deleted` });
};

const updateMovie = async (req, reply) => {
    const movie_id = parseInt(req.params['id']);
    const body = req.body;
    const user_id = req.user['user_id'];
    const data = await MovieInterface.update(movie_id, body, user_id);
    reply.code(201).send(data);
};

const postMovieRating = async (req, reply) => {
    const user_id = req.user['user_id'];
    const movie_id = parseInt(req.params['id']);
    const { score } = req.body;
    
    const params = { user_id, movie_id, score };
    const data = await MovieInterface.postRating(params);
    reply.code(201).send(data);
};

const deleteMovieRating = async (req, reply) => {
    const user_id = req.user['user_id'];
    const movie_id = parseInt(req.params['id']);
    const data = await MovieInterface.deleteRating(user_id, movie_id);
    reply.code(204).send(data);
}

module.exports = {
    getAllMovies,
    getOneMovie,
    postMovie,
    deleteMovie,
    updateMovie,
    postMovieRating,
    deleteMovieRating
};
