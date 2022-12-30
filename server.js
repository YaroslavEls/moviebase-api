require('dotenv').config();
const app = require('fastify')({logger: true});
const seq = require('./database/connection');
const associate = require('./database/associate');
const data_inserting = require('./database/data_inserting');

app.register(require('@fastify/jwt'), {secret: process.env.SECRET});
app.register(require('./router'));

(async () => {
    try {
        associate();
        await seq.sync({force: true});
        await data_inserting();
        await app.listen(process.env.PORT);
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
})();