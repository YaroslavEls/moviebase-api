const {
    getAllMovies,
    getMovie,
    postMovie,
    deleteMovie,
    updateMovie,
    getByGenre
} = require('../controllers/movies')

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
}

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
        handler: getAllMovies
    },

    getMovieSchema: {
        schema: {
            response: {
                200: Movie
            }
        },
        handler: getMovie
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
        handler: postMovie
    },

    deleteMovieSchema: {
        schema: {
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: {type: 'string'}
                    }
                }
            }
        },
        handler: deleteMovie
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
        handler: updateMovie
    },

    getByGenreSchema: {
        schema: {
            response: {
                200: {
                    type: 'array',
                    items: Movie
                }
            }
        },
        handler: getByGenre
    },
};