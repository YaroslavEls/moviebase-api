let data = require('../database/data')

const getAllMovies = (req, reply) => {
    reply.send(data);
}

const getMovie = (req, reply) => {
    const { name } = req.params;

    const item = data.find((item) => item.name === name);

    reply.send(item);
}

const postMovie = (req, reply) => {
    const params = req.body;
    
    newId = data[data.length - 1].id + 1;

    const item = {
        id: newId,
        ...params
    }

    data.push(item)

    reply.code(201).send(item)
}

const deleteMovie = (req, reply) => {
    const { id } = req.params;

    data = data.filter(item => item.id !== +id);

    reply.send({message: `item ${id} has been deleted`})
}

const updateMovie = (req, reply) => {
    const { id } = req.params;
    const params = req.body;

    const item = data.find((item) => item.id === +id);

    const newItem = Object.assign(item, params)

    data = data.map(item => (item.id === +id ? newItem : item));

    reply.send(newItem);
}

module.exports = {
    getAllMovies,
    getMovie,
    postMovie,
    deleteMovie,
    updateMovie
}