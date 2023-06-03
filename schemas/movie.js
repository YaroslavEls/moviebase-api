const AuthController = require('../controllers/auth.controller.js');
const MovieController = require('../controllers/movie.controller.js');

const Genre = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        name: { type: 'string' }
    }
};

const Movie = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        description: { type: 'string' },
        year: { type: 'integer' },
        genres: {
            type: 'array',
            items: Genre
        }
    }
};

module.exports = {
    Movie,

    getAllMoviesSchema: {
        schema: {
            tags: ['movies'],
            response: {
                200: {
                    type: 'array',
                    items: Movie
                }
            }
        },
        handler: MovieController.getAllMovies
    },

    getOneMovieSchema: {
        schema: {
            tags: ['movies'],
            response: {
                200: Movie
            }
        },
        handler: MovieController.getOneMovie
    },

    postMovieSchema: {
        schema: {
            tags: ['movies'],
            body: {
                type: 'object',
                required: ['name', 'description', 'year'],
                properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    year: { type: 'integer' }
                }
            },
            response: {
                201: Movie
            }
        },
        preHandler: AuthController.checkPermission,
        handler: MovieController.postMovie
    },

    deleteMovieSchema: {
        schema: {
            tags: ['movies'],
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
        handler: MovieController.deleteMovie
    },

    updateMovieSchema: {
        schema: {
            tags: ['movies'],
            body: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    year: { type: 'integer' }
                }
            },
            response: {
                201: Movie
            }
        },
        preHandler: AuthController.checkPermission,
        handler: MovieController.updateMovie
    },

    postMovieRatingSchema: {
        schema: {
            tags: ['movies'],
            body: {
                type: 'object',
                required: ['score'],
                properties: {
                    score: { 
                        type: 'integer',
                        minimum: 1,
                        maximum: 10
                    }
                }
            },
            response: {
                201: Movie
            }
        },
        preHandler: AuthController.checkAuth,
        handler: MovieController.postMovieRating
    },

    deleteMovieRatingSchema: {
        schema: {
            tags: ['movies'],
            response: {
                204: Movie
            }
        },
        preHandler: AuthController.checkAuth,
        handler: MovieController.deleteMovieRating
    }
};
