const MovieController = require('../controllers/movie.controller');

const Movie = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        description: { type: 'string' },
        year: { type: 'integer' },
        genres: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' }
                }
            }
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
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                }
            }
        },
        handler: MovieController.updateMovie
    },

    getMoviesByGenreSchema: {
        schema: {
            tags: ['movies'],
            response: {
                200: {
                    type: 'array',
                    items: Movie
                }
            }
        },
        handler: MovieController.getMoviesByGenre
    }
};
