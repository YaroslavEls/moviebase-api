const {
    getAllGenres,
    postGenre,
    deleteGenre
} = require('../controllers/genres');

const Genre = {
    type: 'object',
    properties: {
        id: {type: 'integer'},
        name: {type: 'string'}
    }
}

const getAllGenresSchema = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: Genre
            }
        }
    },
    handler: getAllGenres
}

const postGenreSchema = {
    schema: {
        body: {
            type: 'object',
            required: ['name'],
            properties: {
                name: {type: 'string'}
            }
        },
        response: {
            201: Genre
        }
    },
    handler: postGenre
}

const deleteGenreSchema = {
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
    handler: deleteGenre
}

function genresRoutes(app, options, done) {
    app.get('/genres', getAllGenresSchema);
    app.post('/genres', postGenreSchema);
    app.delete('/genres/:id', deleteGenreSchema);

    done();
}

module.exports = genresRoutes;