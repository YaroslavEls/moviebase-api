const Movie = require('../models/movie.model.js');
const Genre = require('../models/genre.model.js');

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
                model: Genre, 
                as: 'genres'
            }
        });
    },

    async getOneByName(str) {
        return await Movie.findOne({
            where: {
                name: str
            },
            include: {
                model: Genre, 
                as: 'genres'
            }
        });
    },

    async getAllByGenre(num) {
        return await Movie.findAll({
            include: {
                model: Genre,
                as: 'genres',
                where: {
                    id: num
                }
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
