require('dotenv').config()
const app = require('fastify')({logger: true});
app.register(require('./routes/movies'));
const PORT = process.env.PORT;

const start = async () => {
    try {
        await app.listen(PORT);
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
}

start();