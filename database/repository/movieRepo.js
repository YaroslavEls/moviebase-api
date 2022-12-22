const Movie = require('../models/movie');

async function createMovie(data) {
    return await Movie.create(data);
}

async function getMovies() {
    return await Movie.findAll();
}

async function getMovieByName(str) {
    return await Movie.findOne({
        where: {
            name: str
        }
    });
}

async function destroyMovie(num) {
    return await Movie.destroy({
        where: {
            id: num
        }
    });
}

async function refreshMovie(num, data) {
    return await Movie.update(data, {
        where: {
            id: num
        }
    });
}

module.exports = {
    createMovie,
    getMovies,
    getMovieByName,
    destroyMovie,
    refreshMovie
}