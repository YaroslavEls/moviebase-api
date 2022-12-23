const { Op } = require("sequelize");
const Movie = require('../models/movie');
const Genre = require('../models/genre');

async function createMovie(data) {
    const movie = await Movie.create(data);

    if (data['genres']) {
        const genres = await Genre.findAll({
            where: {
                id: data['genres'],
            }
        });

        for (let i = 0; i < genres.length; i++) {
            await movie.addGenre(genres[i]);
        }
    }

    return movie;
}

async function getMovies() {
    return await Movie.findAll({
        include: {
            model: Genre, as: 'genres'
        }
    });
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