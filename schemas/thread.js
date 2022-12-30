const ThreadController = require('../controllers/thread.controller');

const Thread = {
    type: 'object',
    properties: {
        id: {type: 'integer'},
        title: {type: 'string'},
        text: {type: 'string'},
        movie_name: {type: 'string'},
        user_id: {type: 'integer'}
    }
};

module.exports = {
    getAllThreadsSchema: {
        schema: {
            response: {
                200: {
                    type: 'array',
                    items: Thread
                }
            }
        },
        handler: ThreadController.getAllThreads
    },

    getOneThreadSchema: {
        schema: {
            response: {
                200: Thread
            }
        },
        handler: ThreadController.getOneThread
    },

    postThreadSchema: {
        schema: {
            body: {
                type: 'object',
                required: ['title', 'text', 'user_id'],
                properties: {
                    title: {type: 'string'},
                    text: {type: 'string'},
                    user_id: {type: 'integer'}
                }
            },
            response: {
                201: Thread
            }
        },
        handler: ThreadController.postThread
    },

    getThreadsByMovieSchema: {
        schema: {
            response: {
                200: {
                    type: 'array',
                    items: Thread
                }
            }
        },
        handler: ThreadController.getThreadsByMovie
    }
};