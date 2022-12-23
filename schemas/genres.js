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

module.exports = {
    getAllGenresSchema: {
        schema: {
            response: {
                200: {
                    type: 'array',
                    items: Genre
                }
            }
        },
        handler: getAllGenres
    },
    
    postGenreSchema: {
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
    },
    
    deleteGenreSchema: {
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
}