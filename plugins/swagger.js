require('dotenv').config();
const movieSchemas = require('../schemas/movie.js');
const genreSchemas = require('../schemas/genre.js');
const threadSchemas = require('../schemas/thread.js');
const commentSchemas = require('../schemas/comment.js');
const userSchema = require('../schemas/user.js');

module.exports = {
    swagger: {
        swagger: {
            info: {
                title: 'moviebase-api',
                version: '1.0'
            },
            host: process.env.HOST + process.env.PORT,
            tags: [
                { name: 'auth', description: 'Authentication related end-points' },
                { name: 'movies', description: 'Movies related end-points' },
                { name: 'genres', description: 'Genres related end-points' },
                { name: 'users', description: 'Users related end-points' },
                { name: 'threads', description: 'Threads related end-points' },
                { name: 'comments', description: 'Comment related end-points' }
            ],
            definitions: {
                Movie: movieSchemas.Movie,
                Genre: genreSchemas.Genre,
                User: userSchema.User,
                Thread: threadSchemas.Thread,
                Comment: commentSchemas.Comment
            }
        }
    },

    swaggerUi: {
        routePrefix: '/docs'
    }
};
