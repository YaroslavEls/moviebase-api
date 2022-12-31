const CommentController = require('../controllers/comment.controller');

const Comment = {
    type: 'object',
    properties: {
        id: {type: 'integer'},
        text: {type: 'string'},
        thread_id: {type: 'integer'},
        user_id: {type: 'integer'},
        reply_to: {type: 'integer'}
    }
};

module.exports = {
    postCommentSchema: {
        schema: {
            body: {
                type: 'object',
                required: ['text'],
                properties: {
                    text: {type: 'string'},
                    reply_to: {type: 'integer'}
                }
            },
            response: {
                201: Comment
            }
        },
        handler: CommentController.postComment
    },

    deleteCommentSchema: {
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
        handler: CommentController.deleteComment
    }
};