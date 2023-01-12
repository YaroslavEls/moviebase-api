const bcrypt = require('bcryptjs');
const UserInterface = require('../database/interfaces/user.interface');

const login = async (req, reply) => {
    const name = req.body['name'];
    const password = req.body['password'];

    const user = await UserInterface.getOneByName(name);

    if (!user) {
        reply.code(400).send({ message: 'Invalid username' });
    }

    const passCheck = bcrypt.compareSync(password, user.password);
    if (!passCheck) {
        reply.code(400).send({ message: 'Invalid password' });
    }

    const token = await reply.jwtSign({
        user_id: user.id,
        role: user.role
    });

    user.dataValues.token = token;
    reply.code(200).send(user);
};

const registration = async (req, reply) => {
    const body = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(body['password'], salt);
    body['password'] = hash;

    const data = await UserInterface.create(body);
    reply.code(201).send(data);
};

module.exports = {
    login,
    registration
};
