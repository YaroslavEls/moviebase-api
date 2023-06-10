const AuthController = require('../controllers/auth.controller.js');
const GenreController = require('../controllers/genre.controller.js');
const { Movie } = require('./movie.js');

const Genre = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        movies: {
            type: 'array',
            items: Movie,
            default: []
        }
    }
};

module.exports = {
    Genre,

    getAllGenresSchema: {
        schema: {
            tags: ['genres'],
            response: {
                200: {
                    type: 'array',
                    items: Genre
                }
            }
        },
        handler: GenreController.getAllGenres
    },

    getOneGenreSchema: {
        schema: {
            tags: ['genres'],
            response: {
                200: Genre
            }
        },
        handler: GenreController.getOneGenre
    },

    postGenreSchema: {
        schema: {
            tags: ['genres'],
            body: {
                type: 'object',
                required: ['name'],
                properties: {
                    name: { type: 'string' }
                }
            },
            response: {
                201: Genre
            }
        },
        preHandler: AuthController.checkPermission,
        handler: GenreController.postGenre
    },

    deleteGenreSchema: {
        schema: {
            tags: ['genres'],
            response: {
                204: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                }
            }
        },
        preHandler: AuthController.checkPermission,
        handler: GenreController.deleteGenre
    }
};
