const movieSchemas = require('../schemas/movie');
const genreSchemas = require('../schemas/genre');
const threadSchemas = require('../schemas/thread');
const commentSchemas = require('../schemas/comment');
const userSchema = require('../schemas/user');

function Routes(app, options, done) {
    // auth
    app.post('/registration', userSchema.registerUserSchema);
    app.post('/login', userSchema.loginUserSchema);
    // /movies
    app.get('/movies', movieSchemas.getAllMoviesSchema);
    app.get('/movies/:name', movieSchemas.getOneMovieSchema);
    app.post('/movies', movieSchemas.postMovieSchema);
    app.delete('/movies/:id', movieSchemas.deleteMovieSchema);
    app.put('/movies/:id', movieSchemas.updateMovieSchema);
    app.get('/movies/:name/threads', threadSchemas.getThreadsByMovieSchema);
    app.post('/movies/:name/threads', threadSchemas.postThreadSchema);
    // /genres
    app.get('/genres', genreSchemas.getAllGenresSchema);
    app.post('/genres', genreSchemas.postGenreSchema);
    app.delete('/genres/:id', genreSchemas.deleteGenreSchema);
    app.get('/genres/:id', movieSchemas.getMoviesByGenreSchema);
    // /threads
    app.get('/threads', threadSchemas.getAllThreadsSchema);
    app.get('/threads/:id', threadSchemas.getOneThreadSchema);
    app.delete('/threads/:id', threadSchemas.deleteThreadSchema);
    app.post('/threads/:id', commentSchemas.postCommentSchema);
    app.delete('/threads/comments/:id', commentSchemas.deleteCommentSchema);
    //users
    app.get('/users', userSchema.getAllUsersSchema);
    
    done();
}

module.exports = Routes;