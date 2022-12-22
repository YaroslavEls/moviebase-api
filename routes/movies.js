const {
    getAllMovies,
    getMovie,
    postMovie,
    deleteMovie,
    updateMovie
} = require('../controllers/movies')

function moviesRoutes(app, options, done) {
    app.get('/movies', getAllMovies);
    
    app.get('/movies/:name', getMovie);

    app.post('/movies', postMovie);

    app.delete('/movies/:id', deleteMovie)

    app.put('/movies/:id', updateMovie)

    done();
}

module.exports = moviesRoutes;