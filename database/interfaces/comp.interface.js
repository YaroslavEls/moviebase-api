const Compilation = require('../models/comp.model.js');
const Movie = require('../models/movie.model.js');

module.exports = {
    async create(data) {
        return await Compilation.create(data);
    },

    async getAll() {
        return await Compilation.findAll({
            include: {
                model: Movie,
                as: 'movies'
            }
        });
    },

    async getOneById(num) {
        return await Compilation.findOne({
            where: {
                id: num
            },
            include: {
                model: Movie,
                as: 'movies'
            }
        });
    },

    async getOwner(num) {
        return await Compilation.findOne({
            where: {
                id: num
            },
            attributes: ['user_id']
        });
    },

    async delete(num) {
        return await Compilation.destroy({
            where: {
                id: num
            }
        });
    },

    async update(num, data) {
        return await Compilation.update(data, {
            where: {
                id: num
            }
        });
    },

    async addMovie(num1, num2) {
        const comp = await Compilation.findOne(num1);
        await comp.addMovie(num2);
        return comp;
    },

    async removeMovie(num1, num2) {
        const comp = await Compilation.findByPk(num1);
        await comp.removeMovie(num2);
        return comp;
    }
};
