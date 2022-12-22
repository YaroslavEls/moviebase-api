require('dotenv').config()
const app = require('fastify')({logger: true});
app.register(require('./schemas/movies'));
const seq = require('./database/connection')
const PORT = process.env.PORT;

const start = async () => {
    try {
        await seq.sync();
        await app.listen(PORT);
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
}

start();