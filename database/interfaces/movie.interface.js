const seq = require('../connection.js');
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
        const movie = await Movie.findOne({
            where: {
                name: 'Fargo',
            },
            include: {
                model: Genre,
                as: 'genres'
            }
        });

        const ratings = await Rating.findAll({
            where: {
                movie_id: movie.id
            },
            attributes: [
                [seq.fn('avg', seq.col('score')), 'avg_score'],
                [seq.fn('count', seq.col('score')), 'ratings_count'],
            ]
        });

        movie.dataValues.avg_score = ratings[0].dataValues.avg_score;
        movie.dataValues.ratings_count = ratings[0].dataValues.ratings_count;
        
        return movie;
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
