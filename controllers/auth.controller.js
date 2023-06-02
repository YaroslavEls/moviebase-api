const crypto = require('node:crypto');
const UserInterface = require('../database/interfaces/user.interface.js');

const login = async (req, reply) => {
    const { name, password } = req.body;

    const user = await UserInterface.getOneByName(name);

    if (!user) {
        reply.code(400).send({ message: 'Invalid username' });
    }

    const buffer = Buffer.from(user.password, 'utf8');
    const salt = user.password.split(":")[0];
    const hash = salt + ':' + crypto.scryptSync(password, salt, 64).toString('base64');

    if (!crypto.timingSafeEqual(buffer, Buffer.from(hash, 'utf8'))) {
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
    const { email, name, password } = req.body;
    
    const salt = crypto.randomBytes(16).toString('base64');
    const hash = salt + ':' + crypto.scryptSync(password, salt, 64).toString('base64');

    const params = { email, name, 'password': hash };
    const data = await UserInterface.create(params);
    reply.code(201).send(data);
};

const checkAuth = async (req, reply) => {
    try {
        await req.jwtVerify();
    } catch (err) {
        return reply.send(err);
    }
};

module.exports = {
    login,
    registration,
    checkAuth
};
