require('dotenv').config();
const app = require('fastify')({logger: true});
const seq = require('./database/connection');
const associate = require('./database/associate');
const data_inserting = require('./database/data_inserting');
const { swagger, swaggerUi } = require('./plugins/swagger');

app.register(require('@fastify/jwt'), {secret: process.env.SECRET});

(async () => {
    try {
        await app.register(require('@fastify/swagger'), swagger)
        await app.register(require('@fastify/swagger-ui'), swaggerUi)
        app.register(require('./plugins/router'));

        associate();
        await seq.sync({force: true});
        await data_inserting();

        await app.listen(process.env.PORT);
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
})();