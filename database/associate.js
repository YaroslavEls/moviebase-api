const Movie = require('./models/movie');
const Genre = require('./models/genre');
const Thread = require('./models/thread');

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
};

module.exports = associate;