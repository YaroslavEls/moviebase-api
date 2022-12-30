const {
    createUser,
    getUserByName
} = require('../database/interfaces/user')

const login = async (req, reply) => {
    const name = req.body['name'];
    const password = req.body['password'];

    const user = await getUserByName(name);

    if (!user) {
        reply.code(400).send({message: `invalid username`})
    }

    if (user.password !== password) {
        reply.code(400).send({message: `invalid password`})
    }

    reply.code(200).send(user);
}

const registration = async (req, reply) => {
    const params = req.body;

    const result = await createUser(params);

    reply.send(result);
}

module.exports = {
    login,
    registration
}