const Genre = require('../models/genre');

module.exports = {
    async createGenre(data) {
        return await Genre.create(data);
    },
    
    async getGenres() {
        return await Genre.findAll();
    },
    
    async destroyGenre(num) {
        return await Genre.destroy({
            where: {
                id: num
            }
        });
    }
}