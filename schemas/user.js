const UserController = require('../controllers/user.controller');
const AuthController = require('../controllers/auth.controller');

const User = {
    type: 'object',
    properties: {
        id: {type: 'integer'},
        name: {type: 'string'},
        email: {type: 'string'},
        password: {type: 'string'}
    }
};

module.exports = {
    getAllUsersSchema: {
        schema: {
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
            body: {
                type: 'object',
                required: ['email', 'name', 'password'],
                properties: {
                    email: {type: 'string'},
                    name: {type: 'string'},
                    password: {type: 'string'}
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
            body: {
                type: 'object',
                required: ['name', 'password'],
                properties: {
                    name: {type: 'string'},
                    password: {type: 'string'}
                }
            },
            response: {
                200: User,
                400: {
                    type: 'object',
                    properties: {
                        message: {type: 'string'}
                    }
                }
            }
        },
        handler: AuthController.login
    }
};