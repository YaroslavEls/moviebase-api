const Movie = require('../models/movie.model.js');
const Genre = require('../models/genre.model.js');
const Rating = require('../models/rating.model.js');

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

        return await Movie.findOne({
            where: {
                name: data['name']
            },
            include: {
                model: Genre,
                as: 'genres'
            }
        });
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

    async delete(num) {
        await Movie.destroy({
            where: {
                id: num
            }
        });

        return;
    },

    async update(num, data) {
        await Movie.update(data, {
            where: {
                id: num
            }
        });

        return await Movie.findByPk(num, {
            include: {
                model: Genre,
                as: 'genres'
            }
        });
    },

    async postRating(data) {
        const rating = await Rating.findOne({
            where: {
                movie_id: data['movie_id'],
                user_id: data['user_id']
            }
        });

        if (!rating) {
            await Rating.create(data);
        } else {
            await rating.update(data);
        }

        return await Movie.findByPk(data['movie_id'], {
            include: {
                model: Genre,
                as: 'genres'
            }
        });
    },

    async deleteRating(num1, num2) {
        await Rating.destroy({
            where: {
                user_id: num1,
                movie_id: num2
            }
        });

        return await Movie.findByPk(num2, {
            include: {
                model: Genre,
                as: 'genres'
            }
        });
    }
};
