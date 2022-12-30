const MovieController = require('../controllers/movie.controller');

const Movie = {
    type: 'object',
    properties: {
        id: {type: 'integer'},
        name: {type: 'string'},
        description: {type: 'string'},
        year: {type: 'integer'},
        genres: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: {type: 'integer'},
                    name: {type: 'string'}
                }
            }
        }
    }
};

module.exports = {
    getAllMoviesSchema: {
        schema: {
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
            response: {
                200: Movie
            }
        },
        handler: MovieController.getOneMovie
    },

    postMovieSchema: {
        schema: {
            body: {
                type: 'object',
                required: ['name', 'description', 'year'],
                properties: {
                    name: {type: 'string'},
                    description: {type: 'string'},
                    year: {type: 'integer'}
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
            response: {
                204: {
                    type: 'object',
                    properties: {
                        message: {type: 'string'}
                    }
                }
            }
        },
        handler: MovieController.deleteMovie
    },

    updateMovieSchema: {
        schema: {
            body: {
                type: 'object',
                properties: {
                    name: {type: 'string'},
                    description: {type: 'string'},
                    year: {type: 'integer'}
                }
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: {type: 'string'}
                    }
                }
            }
        },
        handler: MovieController.updateMovie
    },

    getMoviesByGenreSchema: {
        schema: {
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