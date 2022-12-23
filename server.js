require('dotenv').config()
const app = require('fastify')({logger: true});
app.register(require('./schemas/movies'));
app.register(require('./schemas/genres'));
const seq = require('./database/connection');
const associate = require('./database/associate');
const data_inserting = require('./database/data_inserting');
const PORT = process.env.PORT;

const start = async () => {
    try {
        associate();
        await seq.sync({force: true});
        await data_inserting();
        
        await app.listen(PORT);
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
}

start();