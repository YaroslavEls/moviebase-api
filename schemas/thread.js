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
                200: {
                    type: 'object',
                    properties: {
                        ...Thread.properties,
                        comments: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: {type: 'integer'},
                                    text: {type: 'string'},
                                    thread_id: {type: 'integer'},
                                    user_id: {type: 'integer'},
                                    reply_to: {type: 'integer'}
                                }
                            }
                        }
                    }
                }
            }
        },
        handler: ThreadController.getOneThread
    },

    postThreadSchema: {
        schema: {
            tags: ['threads'],
            body: {
                type: 'object',
                required: ['title', 'text'],
                properties: {
                    title: {type: 'string'},
                    text: {type: 'string'}
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

    deleteThreadSchema: {
        schema: {
            tags: ['threads'],
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: {type: 'string'}
                    }
                }
            }
        },
        handler: ThreadController.deleteThread
    }
};