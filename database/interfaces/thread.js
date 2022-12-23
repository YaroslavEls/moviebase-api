const Thread = require('../models/thread');
const Movie = require('../models/movie');

module.exports = {
    async createThread(data) {
        return await Thread.create(data);
    },

    async getThreads() {
        return await Thread.findAll();
    },

    async getThread(num) {
        return await Thread.findOne({
            where: {
                id: num
            }
        });
    },

    async getThreadsByMovie(str) {
        return await Thread.findAll({
            where: {
                movie_name: str
            }
        });
    }
}