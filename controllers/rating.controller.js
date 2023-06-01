const RatingInterface = require('../database/interfaces/rating.interface.js');

const getAllRatings = async (req, reply) => {
    const data = await RatingInterface.getAll();
    reply.code(200).send(data);
};

const getRatingsByUser = async (req, reply) => {
    const id = parseInt(req.params['id']);
    const data = await RatingInterface.getAllByUser(id);
    reply.code(200).send(data);
};

const postRating = async (req, reply) => {
    let token;
    try {
        token = await req.jwtVerify();
    } catch (err) {
        return reply.send(err);
    }

    const user_id = token['user_id'];
    const movie_id = parseInt(req.params['id']);
    const { score } = req.body;
    const params = { user_id, movie_id, score };
    const data = await RatingInterface.create(params);
    reply.code(201).send(data);
};

const deleteRating = async (req, reply) => {
    let token;
    try {
        token = await req.jwtVerify();
    } catch (err) {
        return reply.send(err);
    }

    const user_id = token['user_id'];
    const movie_id = parseInt(req.params['id']);
    await RatingInterface.delete(user_id, movie_id);
    reply.code(204).send({ message: `rating has been deleted` });
}

module.exports = {
    getAllRatings,
    getRatingsByUser,
    postRating,
    deleteRating
};