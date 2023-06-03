const movieSchemas = require('../schemas/movie.js');
const genreSchemas = require('../schemas/genre.js');
const threadSchemas = require('../schemas/thread.js');
const userSchema = require('../schemas/user.js');
const compSchema = require('../schemas/comp.js');

function Routes(app, options, done) {
    app.post('/registration', userSchema.registerUserSchema);
    app.post('/login', userSchema.loginUserSchema);

    app.get('/movies', movieSchemas.getAllMoviesSchema);
    app.post('/movies', movieSchemas.postMovieSchema);
    app.get('/movies/:name', movieSchemas.getOneMovieSchema);
    app.delete('/movies/:id', movieSchemas.deleteMovieSchema);
    app.put('/movies/:id', movieSchemas.updateMovieSchema);
    app.post('/movies/:id/rate', movieSchemas.postMovieRatingSchema);
    app.delete('/movies/:id/rate', movieSchemas.deleteMovieRatingSchema);
    
    app.get('/genres', genreSchemas.getAllGenresSchema);
    app.post('/genres', genreSchemas.postGenreSchema);
    app.get('/genres/:id', genreSchemas.getOneGenreSchema);
    app.delete('/genres/:id', genreSchemas.deleteGenreSchema);

    app.get('/users', userSchema.getAllUsersSchema);
    app.get('/users/:id', userSchema.getOneUserSchema);
    app.post('/users/follow/:id', userSchema.postUserFollowSchema);
    app.delete('/users/follow/:id', userSchema.deleteUserFollowSchema);
    app.get('/users/:id/ratings', userSchema.getUserRatingsSchema);

    app.get('/threads', threadSchemas.getAllThreadsSchema);
    app.get('/threads/:id', threadSchemas.getOneThreadSchema);
    app.delete('/threads/:id', threadSchemas.deleteThreadSchema);
    app.get('/threads/movie/:name', threadSchemas.getThreadsByMovieSchema);
    app.post('/threads/movie/:name', threadSchemas.postThreadSchema);
    app.post('/threads/:id/comment', threadSchemas.postThreadCommentSchema);
    app.delete('/threads/:id/comment', threadSchemas.deleteThreadCommentSchema);

    app.get('/compilations', compSchema.getAllCompsSchema);
    app.post('/compilations', compSchema.postCompSchema);
    app.get('/compilations/:id', compSchema.getOneCompSchema);
    app.delete('/compilations/:id', compSchema.deleteCompSchema);
    app.put('/compilations/:id', compSchema.updateCompSchema);
    app.post('/compilations/:comp_id/:movie_id', compSchema.addMovieCompSchema);
    app.delete('/compilations/:comp_id/:movie_id', compSchema.removeMovieCompSchema);

    done();
}

module.exports = Routes;
