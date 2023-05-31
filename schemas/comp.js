const CompController = require('../controllers/comp.controller.js');
const { Movie } = require('./movie.js')

const Compilation = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        title: { type: 'string' },
        desc: { type: 'string' },
        user_id: { type: 'integer' },
        movies: {
            type: 'array',
            items: Movie
        }
    }
};

module.exports = {
    Compilation,

    getAllCompsSchema: {
        schema: {
            tags: ['compilations'],
            response: {
                200: {
                    type: 'array',
                    items: Compilation
                }
            }
        },
        handler: CompController.getAllComps
    },

    getOneCompSchema: {
        schema: {
            tags: ['compilations'],
            response: {
                200: Compilation
            }
        },
        handler: CompController.getOneComp
    },

    postCompSchema: {
        schema: {
            tags: ['compilations'],
            body: {
                required: ['title'],
                properties: {
                    title: { type: 'string' },
                    desc: { type: 'string' }
                }
            },
            response: {
                201: Compilation
            }
        },
        handler: CompController.postComp
    },

    deleteCompSchema: {
        schema: {
            tags: ['compilations'],
            response: {
                403: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                },
                204: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                }
            }
        },
        handler: CompController.deleteComp
    },

    updateCompSchema: {
        schema: {
            tags: ['compilations'],
            body: {
                type: 'object',
                properties: {
                    title: { type: 'string' },
                    desc: { type: 'string' }
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
        handler: CompController.updateComp
    },

    addMovieCompSchema: {
        schema: {
            tags: ['compilations'],
            response: {
                200: Compilation
            }
        },
        handler: CompController.addMovieComp
    },

    removeMovieCompSchema: {
        schema: {
            tags: ['compilations'],
            response: {
                200: Compilation
            }
        },
        handler: CompController.removeMovieComp
    }
};
