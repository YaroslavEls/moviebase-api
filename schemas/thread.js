const {
    getAllThreads,
    getOneThread,
    postThread,
    getByMovie
} = require('../controllers/threads');

const Thread = {
    type: 'object',
    properties: {
        id: {type: 'integer'},
        title: {type: 'string'},
        text: {type: 'string'},
        movie_name: {type: 'string'},
        user_id: {type: 'integer'}
    }
}

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
        handler: getAllThreads
    },

    getOneThreadSchema: {
        schema: {
            response: {
                200: Thread
            }
        },
        handler: getOneThread
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
        handler: postThread
    },

    getByMovieSchema: {
        schema: {
            response: {
                200: {
                    type: 'array',
                    items: Thread
                }
            }
        },
        handler: getByMovie
    }
};