require('dotenv').config();
const Fastify = require('fastify');
const seq = require('./database/connection.js');
const associate = require('./database/associate.js');
const data_inserting = require('./database/data_inserting.js');
const { swagger, swaggerUi } = require('./plugins/swagger.js');
const logger = require('./utils/logger.js');

const build = async env => {
    const app = Fastify({ logger: logger[env] });

    app.register(require('@fastify/jwt'), {
        secret: process.env.SECRET,
        sign: { expiresIn: '1h' }
    });
    await app.register(require('@fastify/swagger'), swagger);
    await app.register(require('@fastify/swagger-ui'), swaggerUi);
    app.register(require('./plugins/router.js'));

    seq.options.logging = (...msg) => { app.log.info(msg[0]); };
    associate();
    await seq.sync({ force: true });
    await data_inserting();

    return app;
};

module.exports = build;
