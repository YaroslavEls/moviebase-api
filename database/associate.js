const Movie = require('./models/movie');
const Genre = require('./models/genre')

const associate = () => {
    Movie.belongsToMany(Genre, {
        through: 'movie_genre',
        foreignKey: 'movie_id'
    });

    Genre.belongsToMany(Movie, {
        through: 'movie_genre',
        foreignKey: 'genre_id'
    });
};

module.exports = associate;