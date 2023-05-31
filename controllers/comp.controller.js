const CompInterface = require('../database/interfaces/comp.interface.js');

const getAllComps = async (req, reply) => {
    const data = await CompInterface.getAll();
    reply.code(200).send(data);
};

const getOneComp = async (req, reply) => {
    const id = parseInt(req.params['id']);
    const data = await CompInterface.getOneById(id);
    reply.code(200).send(data);
};

const postComp = async (req, reply) => {
    let token;
    try {
        token = await req.jwtVerify();
    } catch (err) {
        return reply.send(err);
    }

    const { title, desc } = req.body;
    const user_id = token['user_id'];

    const params = { title, desc, user_id };
    console.log(params)
    const data = await CompInterface.create(params);
    reply.code(201).send(data);
};

const deleteComp = async (req, reply) => {
    let token;
    try {
        token = await req.jwtVerify();
    } catch (err) {
        return reply.send(err);
    }

    const id = parseInt(req.params['id']);
    const owner = await CompInterface.getOwner(id);

    if (owner.user_id != token['user_id']) {
        return reply.code(403).send({ message: 'Permission denied' });
    }

    await CompInterface.delete(id);
    reply.code(204).send({ message: `item ${id} has been deleted` });
};

const updateComp = async (req, reply) => {
    let token;
    try {
        token = await req.jwtVerify();
    } catch (err) {
        return reply.send(err);
    }

    const id = parseInt(req.params['id']);
    const owner = await CompInterface.getOwner(id);

    if (owner.user_id != token['user_id']) {
        return reply.code(403).send({ message: 'Permission denied' });
    }

    const body = req.body;
    await CompInterface.update(id, body);
    reply.code(204).send({ message: `item ${id} has been updated` });
};

module.exports = {
    getAllComps,
    getOneComp,
    postComp,
    deleteComp,
    updateComp
};
