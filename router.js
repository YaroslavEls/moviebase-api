const movieSchemas = require('./schemas/movies');
const genreSchemas = require('./schemas/genres');

function Routes(app, options, done) {
    app.get('/movies', movieSchemas.getAllMoviesSchema);
    app.get('/movies/:name', movieSchemas.getMovieSchema);   
    app.post('/movies', movieSchemas.postMovieSchema);
    app.delete('/movies/:id', movieSchemas.deleteMovieSchema);
    app.put('/movies/:id', movieSchemas.updateMovieSchema);

    app.get('/genres', genreSchemas.getAllGenresSchema);
    app.post('/genres', genreSchemas.postGenreSchema);
    app.delete('/genres/:id', genreSchemas.deleteGenreSchema);

    app.get('/genres/:id', movieSchemas.getByGenreSchema);

    done();
}

module.exports = Routes;