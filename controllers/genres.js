const {
    getGenres,
    createGenre,
    destroyGenre
} = require('../database/interfaces/genre')

const getAllGenres = async (req, reply) => {
    const result = await getGenres();
    reply.send(result);
}

const postGenre = async (req, reply) => {
    const params = req.body;

    await createGenre(params);

    reply.send(params);
}

const deleteGenre = async (req, reply) => {
    const { id } = req.params;

    await destroyGenre(id);

    reply.send({message: `genre ${id} has been deleted`});
}

module.exports = {
    getAllGenres,
    postGenre,
    deleteGenre
}