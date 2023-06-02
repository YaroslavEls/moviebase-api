require('dotenv').config();
const Fastify = require('fastify');
const seq = require('./database/connection.js');
const associate = require('./database/associate.js');
const data_inserting = require('./database/data_inserting.js');
const { swagger, swaggerUi } = require('./plugins/swagger.js');

const build = async (logs=true) => {
    const app = Fastify({ logger: logs });

    app.register(require('@fastify/jwt'), { 
        secret: process.env.SECRET, 
        sign: { expiresIn: '1h' } 
    });
    await app.register(require('@fastify/swagger'), swagger);
    await app.register(require('@fastify/swagger-ui'), swaggerUi);
    app.register(require('./plugins/router.js'));

    seq.options.logging = logs;
    associate();
    await seq.sync({ force: true });
    await data_inserting();

    return app;
}

module.exports = build;
