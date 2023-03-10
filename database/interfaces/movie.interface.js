const Movie = require('../models/movie.model');
const Genre = require('../models/genre.model');

module.exports = {
    async create(data) {
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
    },

    async getAll() {
        return await Movie.findAll({
            include: {
                model: Genre, as: 'genres'
            }
        });
    },

    async getAllByGenre(num) {
        return await Movie.findAll({
            include: {
                model: Genre,
                where: {
                    id: num
                }
            }
        });
    },

    async getOneByName(str) {
        return await Movie.findOne({
            where: {
                name: str
            }
        });
    },

    async delete(num) {
        return await Movie.destroy({
            where: {
                id: num
            }
        });
    },

    async update(num, data) {
        return await Movie.update(data, {
            where: {
                id: num
            }
        });
    }
};
