const RatingController = require('../controllers/rating.controller.js');
const { Movie } = require('./movie.js');

const Rating = {
    type: 'object',
    properties: {
        movie_id : { type: 'integer' },
        user_id: { type: 'integer' },
        score: { type: 'integer' },
        movie: Movie
    }
};

module.exports = {
    Rating,

    getAllRatingsSchema: {
        schema: {
            tags: ['ratings'],
            response: {
                200: {
                    type: 'array',
                    items: Rating
                }
            }
        },
        handler: RatingController.getAllRatings
    },

    getRatingsByUserSchema: {
        schema: {
            tags: ['ratings'],
            response: {
                200: {
                    type: 'array',
                    items: Rating
                }
            }
        },
        handler: RatingController.getRatingsByUser
    },

    postRatingSchema: {
        schema: {
            tags: ['ratings'],
            body: {
                type: 'object',
                required: ['score'],
                properties: {
                    score: { 
                        type: 'integer',
                        minimum: 1,
                        maximum: 10
                    }
                }
            },
            response: {
                201: Rating
            }
        },
        handler: RatingController.postRating
    },

    deleteRatingSchema: {
        schema: {
            tags: ['ratings'],
            response: {
                204: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                }
            }
        },
        handler: RatingController.deleteRating
    }
};