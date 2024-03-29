const seq = require('../connection.js');
const { Op } = require('sequelize');
const Movie = require('../models/movie.model.js');
const Genre = require('../models/genre.model.js');
const Rating = require('../models/rating.model.js');

const _getOne = async (m_id, u_id, name=false) => {
    const query = {
        where: name ? { name: name } : { id: m_id },
        include: [
            { model: Genre, as: 'genres' },
        ],
    };

    const movie = await Movie.findOne(query);

    if (u_id) {
        const rating = await Rating.findOne({
            where: {
                user_id: u_id,
                movie_id: movie.id
            }
        });

        if (rating) {
            movie.dataValues.your_rating = rating['score'];
        }
    }

    const ratings = await Rating.findAll({
        where: {
            movie_id: movie.id
        },
        attributes: [
            [seq.fn('avg', seq.col('score')), 'avg_score'],
            [seq.fn('count', seq.col('score')), 'ratings_count'],
        ]
    });

    if (ratings[0]) {
        movie.dataValues.avg_score = ratings[0].dataValues.avg_score;
        movie.dataValues.ratings_count = ratings[0].dataValues.ratings_count;
    }

    return movie;
};

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
            include: [
                { model: Genre, as: 'genres' }
            ]
        });
    },

    async getAll() {
        return await Movie.findAll({
            include: [
                { model: Genre, as: 'genres' }
            ]
        });
    },

    async getOneByName(str, user_id) {
        return await _getOne(0, user_id, str);
    },

    async getPopular() {
        const time = new Date();
        time.setHours(time.getHours() - 24);

        const ratings = await Rating.findAll({
            where: {
                createdAt: {
                    [Op.gte]: time
                }
            },
            attributes: [
                'movie_id',
                [seq.fn('count', seq.col('movie_id')), 'count']
            ],
            group: ['movie_id'],
            order: [['count', 'DESC']],
            limit: 100
        });

        const ids = ratings.map(item => item['movie_id']);

        return await Movie.findAll({
            where: {
                id: {
                    [Op.in]: ids
                }
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

    async update(num, data, user_id) {
        await Movie.update(data, {
            where: {
                id: num
            }
        });

        return await _getOne(num, user_id);
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

        return await _getOne(data['movie_id'], data['user_id']);
    },

    async deleteRating(num1, num2) {
        await Rating.destroy({
            where: {
                user_id: num1,
                movie_id: num2
            }
        });

        return await _getOne(num2, num1);
    }
};
