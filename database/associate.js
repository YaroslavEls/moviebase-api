const Movie = require('./models/movie.model.js');
const Genre = require('./models/genre.model.js');
const Thread = require('./models/thread.model.js');
const Comment = require('./models/comment.model.js');
const User = require('./models/user.model.js');
const Compilation = require('./models/comp.model');

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

    Movie.belongsToMany(Compilation, {
        through: 'movie_comp',
        foreignKey: 'movie_id'
    });
    Compilation.belongsToMany(Movie, {
        through: 'movie_comp',
        foreignKey: 'comp_id'
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

    User.hasMany(Compilation, {
        foreignKey: 'user_id',
        sourceKey: 'id'
    });
    Compilation.belongsTo(User, {
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
