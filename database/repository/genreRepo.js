const Genre = require('../models/genre');

async function createGenre(data) {
    return await Genre.create(data);
}

async function getGenres() {
    return await Genre.findAll();
}

async function destroyGenre(num) {
    return await Genre.destroy({
        where: {
            id: num
        }
    });
}

module.exports = {
    createGenre,
    getGenres,
    destroyGenre
}