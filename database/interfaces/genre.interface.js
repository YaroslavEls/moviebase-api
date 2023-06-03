const Genre = require('../models/genre.model.js');
const Movie = require('../models/movie.model.js');

module.exports = {
    async create(data) {
        return await Genre.create(data);
    },

    async getAll() {
        return await Genre.findAll();
    },

    async getOneById(num) {
        return await Genre.findOne({
            where: {
                id: num
            },
            include: {
                model: Movie,
                as: 'movies'
            }
        });
    },

    async delete(num) {
        await Genre.destroy({
            where: {
                id: num
            }
        });

        return;
    }
};
