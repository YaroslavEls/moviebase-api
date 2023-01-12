const UserController = require('../controllers/user.controller');
const AuthController = require('../controllers/auth.controller');

const User = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        role: { type: 'string' }
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
