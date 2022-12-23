const {
    getAllMovies,
    getMovie,
    postMovie,
    deleteMovie,
    updateMovie
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

const getAllMoviesSchema = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: Movie
            }
        }
    },
    handler: getAllMovies
}

const getMovieSchema = {
    schema: {
        response: {
            200: Movie
        }
    },
    handler: getMovie
}

const postMovieSchema = {
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
}

const deleteMovieSchema = {
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
}

const updateMovieHandler = {
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
}


function moviesRoutes(app, options, done) {
    app.get('/movies', getAllMoviesSchema);
    app.get('/movies/:name', getMovieSchema);
    app.post('/movies', postMovieSchema);
    app.delete('/movies/:id', deleteMovieSchema)
    app.put('/movies/:id', updateMovieHandler)

    done();
}

module.exports = moviesRoutes;