const UserInterface = require('../database/interfaces/user.interface.js');

const getAllUsers = async (req, reply) => {
    const data = await UserInterface.getAll();
    reply.code(200).send(data);
};

const getOneUser = async (req, reply) => {
    const id = parseInt(req.params['id']);
    const data = await UserInterface.getOneById(id);
    reply.code(200).send(data);
};

const postUserFollow = async (req, reply) => {
    const user1_id = req.user['user_id'];
    const user2_id = parseInt(req.params['id']);
    const data = await UserInterface.postFollow(user1_id, user2_id);
    reply.code(201).send(data);
};

const deleteUserFollow = async (req, reply) => {
    const user1_id = req.user['user_id'];
    const user2_id = parseInt(req.params['id']);
    const data = await UserInterface.deleteFollow(user1_id, user2_id);
    reply.code(204).send(data);
};

const getUserRatings = async (req, reply) => {
    const id = parseInt(req.params['id']);
    const data = await UserInterface.getRatings(id);
    reply.code(200).send(data);
};

module.exports = {
    getAllUsers,
    getOneUser,
    postUserFollow,
    deleteUserFollow,
    getUserRatings
};
