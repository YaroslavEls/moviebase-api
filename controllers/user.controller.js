const UserInterface = require('../database/interfaces/user.interface');

const getAllUsers = async (req, reply) => {
    const data = await UserInterface.getAll();
    reply.code(200).send(data);
};

module.exports = {
    getAllUsers
};
