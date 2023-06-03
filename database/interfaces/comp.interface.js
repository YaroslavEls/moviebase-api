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
        return await Compilation.findByPk(num, {
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
        await Compilation.destroy({
            where: {
                id: num
            }
        });

        return;
    },

    async update(num, data) {
        await Compilation.update(data, {
            where: {
                id: num
            }
        });

        return await Compilation.findByPk(num, {
            include: {
                model: Movie,
                as: 'movies'
            }
        });
    },

    async addMovie(num1, num2) {
        const comp = await Compilation.findByPk(num1);
        await comp.addMovie(num2);
        
        return await Compilation.findByPk(num1, {
            include: {
                model: Movie,
                as: 'movies'
            }
        });
    },

    async removeMovie(num1, num2) {
        const comp = await Compilation.findByPk(num1);
        await comp.removeMovie(num2);
        
        return await Compilation.findByPk(num1, {
            include: {
                model: Movie,
                as: 'movies'
            }
        });
    }
};
