const movieSchemas = require('../schemas/movie.js');
const genreSchemas = require('../schemas/genre.js');
const threadSchemas = require('../schemas/thread.js');
const commentSchemas = require('../schemas/comment.js');
const userSchema = require('../schemas/user.js');

function Routes(app, options, done) {
    app.post('/registration', userSchema.registerUserSchema);
    app.post('/login', userSchema.loginUserSchema);

    app.get('/movies', movieSchemas.getAllMoviesSchema);
    app.get('/movies/:name', movieSchemas.getOneMovieSchema);
    app.post('/movies', movieSchemas.postMovieSchema);
    app.delete('/movies/:id', movieSchemas.deleteMovieSchema);
    app.put('/movies/:id', movieSchemas.updateMovieSchema);
    app.get('/movies/:name/threads', threadSchemas.getThreadsByMovieSchema);
    app.post('/movies/:name/threads', threadSchemas.postThreadSchema);

    app.get('/genres', genreSchemas.getAllGenresSchema);
    app.post('/genres', genreSchemas.postGenreSchema);
    app.delete('/genres/:id', genreSchemas.deleteGenreSchema);
    app.get('/genres/:id', movieSchemas.getMoviesByGenreSchema);

    app.get('/threads', threadSchemas.getAllThreadsSchema);
    app.get('/threads/:id', threadSchemas.getOneThreadSchema);
    app.delete('/threads/:id', threadSchemas.deleteThreadSchema);
    app.post('/threads/:id', commentSchemas.postCommentSchema);
    app.delete('/threads/comments/:id', commentSchemas.deleteCommentSchema);

    app.get('/users', userSchema.getAllUsersSchema);
    app.get('/users/:id', userSchema.getOneUserSchema);
    app.post('/users/:id', userSchema.postUserFollowSchema);
    app.delete('/users/:id', userSchema.deleteUserFollowSchema);

    done();
}

module.exports = Routes;
