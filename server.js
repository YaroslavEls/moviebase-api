require('dotenv').config();
const build = require('./index.js');

(async () => {
    const app = await build();
    try {
        await app.listen(process.env.PORT);
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
})();