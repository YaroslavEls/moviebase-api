const {
    postComment,
    getByThread
} = require('../controllers/comments')

const Comment = {
    type: 'object',
    properties: {
        id: {type: 'integer'},
        text: {type: 'string'},
        thread_id: {type: 'integer'},
        user_id: {type: 'integer'},
        reply_to: {type: 'integer'}
    }
}

module.exports = {
    postCommentSchema: {
        schema: {
            body: {
                type: 'object',
                required: ['text', 'user_id'],
                properties: {
                    text: {type: 'string'},
                    user_id: {type: 'integer'},
                    reply_to: {type: 'integer'}
                }
            },
            response: {
                201: Comment
            }
        },
        handler: postComment
    },

    getByThreadSchema: {
        schema: {
            response: {
                200: {
                    type: 'array',
                    items: Comment
                }
            }
        },
        handler: getByThread
    },
}