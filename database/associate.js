const Movie = require('./models/movie.model.js');
const Genre = require('./models/genre.model.js');
const Thread = require('./models/thread.model.js');
const Comment = require('./models/comment.model.js');
const User = require('./models/user.model.js');

const associate = () => {
    Movie.belongsToMany(Genre, {
        through: 'movie_genre',
        foreignKey: 'movie_id'
    });
    Genre.belongsToMany(Movie, {
        through: 'movie_genre',
        foreignKey: 'genre_id'
    });

    Movie.hasMany(Thread, {
        foreignKey: 'movie_id',
        sourceKey: 'id'
    });
    Thread.belongsTo(Movie, {
        foreignKey: 'movie_id',
        sourceKey: 'id'
    });

    Thread.hasMany(Comment, {
        foreignKey: 'thread_id',
        sourceKey: 'id'
    });
    Comment.belongsTo(Thread, {
        foreignKey: 'thread_id',
        sourceKey: 'id'
    });

    User.belongsToMany(User, {
        as: 'followers',
        through: 'follows',
        foreignKey: 'followers'
    });
    User.belongsToMany(User, {
        as: 'followings',
        through: 'follows',
        foreignKey: 'followings'
    });

    User.hasMany(Thread, {
        foreignKey: 'user_id',
        sourceKey: 'id'
    });
    Thread.belongsTo(User, {
        foreignKey: 'user_id',
        sourceKey: 'id'
    });

    User.hasMany(Comment, {
        foreignKey: 'user_id',
        sourceKey: 'id'
    });
    Comment.belongsTo(User, {
        foreignKey: 'user_id',
        sourceKey: 'id'
    });

    Comment.hasMany(Comment, {
        foreignKey: 'reply_to',
        sourceKey: 'id'
    });
    Comment.belongsTo(Comment, {
        foreignKey: 'reply_to',
        sourceKey: 'id'
    });
};

module.exports = associate;
