const GenreController = require('../controllers/genre.controller');

const Genre = {
    type: 'object',
    properties: {
        id: {type: 'integer'},
        name: {type: 'string'}
    }
}

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
    
    postGenreSchema: {
        schema: {
            tags: ['genres'],
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
        handler: GenreController.postGenre
    },
    
    deleteGenreSchema: {
        schema: {
            tags: ['genres'],
            response: {
                204: {
                    type: 'object',
                    properties: {
                        message: {type: 'string'}
                    }
                }
            }
        },
        handler: GenreController.deleteGenre
    }
};