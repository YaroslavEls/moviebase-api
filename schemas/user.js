const AuthController = require('../controllers/auth.controller.js');
const UserController = require('../controllers/user.controller.js');
const { Compilation } = require('./comp.js');
const { Movie } = require('./movie.js');

const Follow = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        email: { type: 'string' }
    }
};

const User = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        role: { type: 'string' },
        compilations: {
            type: 'array',
            items: Compilation
        },
        followers: {
            type: 'array',
            items: Follow
        },
        followings: {
            type: 'array',
            items: Follow
        }
    }
};

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
    User,

    getAllUsersSchema: {
        schema: {
            tags: ['users'],
            response: {
                200: {
                    type: 'array',
                    items: User
                }
            }
        },
        handler: UserController.getAllUsers
    },

    getOneUserSchema: {
        schema: {
            tags: ['users'],
            response: {
                200: User
            }
        },
        handler: UserController.getOneUser
    },

    postUserFollowSchema: {
        schema: {
            tags: ['users'],
            response: {
                201: User
            }
        },
        preHandler: AuthController.checkAuth,
        handler: UserController.postUserFollow
    },

    deleteUserFollowSchema: {
        schema: {
            tags: ['users'],
            response: {
                204: User
            }
        },
        preHandler: AuthController.checkAuth,
        handler: UserController.deleteUserFollow
    },

    getUserRatingsSchema: {
        schema: {
            tags: ['users'],
            response: {
                200: {
                    type: 'array',
                    items: Rating
                }
            }
        },
        handler: UserController.getUserRatings
    },

    registerUserSchema: {
        schema: {
            tags: ['auth'],
            body: {
                type: 'object',
                required: ['email', 'name', 'password'],
                properties: {
                    email: { type: 'string' },
                    name: { type: 'string' },
                    password: { type: 'string' }
                }
            },
            response: {
                201: User
            }
        },
        handler: AuthController.registration
    },

    loginUserSchema: {
        schema: {
            tags: ['auth'],
            body: {
                type: 'object',
                required: ['name', 'password'],
                properties: {
                    name: { type: 'string' },
                    password: { type: 'string' }
                }
            },
            response: {
                200:
                {
                    type: 'object',
                    properties: {
                        ...User.properties,
                        token: { tipe: 'string' }
                    }
                },
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                }
            }
        },
        handler: AuthController.login
    }
};
