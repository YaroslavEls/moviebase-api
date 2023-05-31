const ThreadController = require('../controllers/thread.controller.js');
const { Comment } = require('./comment.js')

const Thread = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        title: { type: 'string' },
        text: { type: 'string' },
        movie_name: { type: 'string' },
        user_id: { type: 'integer' },
        is_review: {type: 'boolean'},
        comments: {
            type: 'array',
            items: Comment
        }
    }
};

module.exports = {
    Thread,

    getAllThreadsSchema: {
        schema: {
            tags: ['threads'],
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
            tags: ['threads'],
            response: {
                200: Thread
            }
        },
        handler: ThreadController.getOneThread
    },

    getThreadsByMovieSchema: {
        schema: {
            tags: ['threads'],
            response: {
                200: {
                    type: 'array',
                    items: Thread
                }
            }
        },
        handler: ThreadController.getThreadsByMovie
    },

    postThreadSchema: {
        schema: {
            tags: ['threads'],
            body: {
                type: 'object',
                required: ['title', 'text'],
                properties: {
                    title: { type: 'string' },
                    text: { type: 'string' }
                }
            },
            response: {
                201: Thread
            }
        },
        handler: ThreadController.postThread
    },

    deleteThreadSchema: {
        schema: {
            tags: ['threads'],
            response: {
                204: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                }
            }
        },
        handler: ThreadController.deleteThread
    }
};
