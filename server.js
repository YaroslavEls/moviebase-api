require('dotenv').config();
const app = require('fastify')({ logger: true });
const seq = require('./database/connection.js');
const associate = require('./database/associate.js');
const data_inserting = require('./database/data_inserting.js');
const { swagger, swaggerUi } = require('./plugins/swagger.js');

app.register(require('@fastify/jwt'), { secret: process.env.SECRET });

(async () => {
    try {
        await app.register(require('@fastify/swagger'), swagger);
        await app.register(require('@fastify/swagger-ui'), swaggerUi);
        app.register(require('./plugins/router'));

        associate();
        await seq.sync({ force: true });
        await data_inserting();

        await app.listen(process.env.PORT);
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
})();
