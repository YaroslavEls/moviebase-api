require('dotenv').config();
const build = require('./index.js');

(async () => {
    const app = await build('dev');
    try {
        await app.listen({ port: process.env.PORT });
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
})();
