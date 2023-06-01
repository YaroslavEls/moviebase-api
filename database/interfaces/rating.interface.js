const Rating = require('../models/rating.model.js');
const Movie = require('../models/movie.model.js');

module.exports = {
    async create(data) {
        const rating = await Rating.findOne({
            where: {
                movie_id: data['movie_id'],
                user_id: data['user_id']
            }
        });

        if (!rating) {
            return await Rating.create(data);
        }

        return await rating.update(data);
    },

    async getAll() {
        return await Rating.findAll();
    },

    async getAllByUser(num) {
        return await Rating.findAll({
            where: {
                user_id: num
            },
            include: {
                model: Movie,
                as: 'movie'
            }
        });
    },

    async delete(num1, num2) {
        return await Rating.destroy({
            where: {
                user_id: num1,
                movie_id: num2
            }
        });
    }
};
