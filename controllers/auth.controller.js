const UserInterface = require('../database/interfaces/user.interface');

const login = async (req, reply) => {
    const name = req.body['name'];
    const password = req.body['password'];

    const user = await UserInterface.getOneByName(name);

    if (!user) {
        reply.code(400).send({message: `invalid username`})
    }

    if (user.password !== password) {
        reply.code(400).send({message: `invalid password`})
    }

    reply.code(200).send(user);
};

const registration = async (req, reply) => {
    const body = req.body;
    const data = await UserInterface.create(body);
    reply.code(201).send(data);
};

module.exports = {
    login,
    registration
};