const {
    getAllUsers
} = require('../controllers/users');
const {
    registration,
    login
} = require('../controllers/auth');

const User = {
    type: 'object',
    properties: {
        id: {type: 'integer'},
        name: {type: 'string'},
        email: {type: 'string'},
        password: {type: 'string'}
    }
}

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
        handler: getAllUsers
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
                200: User,
                201: User
            }
        },
        handler: registration
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
                201: User,
                400: {
                    type: 'object',
                    properties: {
                        message: {type: 'string'}
                    }
                }
            }
        },
        handler: login
    }
}