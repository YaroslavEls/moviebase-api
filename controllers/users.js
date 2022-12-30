const {
    getUsers
} = require('../database/interfaces/user')

const getAllUsers = async (req, reply) => {
    const result = await getUsers();
    reply.send(result);
}

module.exports = {
    getAllUsers
}