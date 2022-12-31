require('dotenv').config();
const movieSchemas = require('../schemas/movie');
const genreSchemas = require('../schemas/genre');
const threadSchemas = require('../schemas/thread');
const commentSchemas = require('../schemas/comment');
const userSchema = require('../schemas/user');

module.exports = {
    swagger: {
        swagger: {
            info: {
                title: 'moviebase-api',
                version: '0.1.0'
            },
            host: 'localhost:' + process.env.PORT,
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
}