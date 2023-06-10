const Compilation = require('../models/comp.model.js');
const Movie = require('../models/movie.model.js');

module.exports = {
    async create(data) {
        return await Compilation.create(data);
    },

    async getAll() {
        return await Compilation.findAll({
            include: [
                { model: Movie, as: 'movies' }
            ]
        });
    },

    async getOneById(num) {
        return await Compilation.findByPk(num, {
            include: [
                { model: Movie, as: 'movies' }
            ]
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
        const comp = await this.getOneById(num);

        await comp.update(data, {
            where: {
                id: num
            }
        });

        return comp;
    },

    async addMovie(num1, num2) {
        const comp = await this.getOneById(num1);
        await comp.addMovie(num2);
        return comp;
    },

    async removeMovie(num1, num2) {
        const comp = await this.getOneById(num1);
        await comp.removeMovie(num2);
        return comp;
    }
};
