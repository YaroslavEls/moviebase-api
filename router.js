const movieSchemas = require('./schemas/movies');
const genreSchemas = require('./schemas/genres');
const threadSchemas = require('./schemas/thread');
const commentSchemas = require('./schemas/comment');
const userSchema = require('./schemas/users');

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

    app.get('/threads', threadSchemas.getAllThreadsSchema);
    app.get('/threads/:id', threadSchemas.getOneThreadSchema);
    
    app.get('/movies/:name/threads', threadSchemas.getByMovieSchema);
    app.post('/movies/:name/threads', threadSchemas.postThreadSchema);

    app.get('/threads/:id/comments', commentSchemas.getByThreadSchema);
    app.post('/threads/:id/comments', commentSchemas.postCommentSchema);

    app.post('/registration', userSchema.registerUserSchema);
    app.post('/login', userSchema.loginUserSchema);

    app.get('/users', userSchema.getAllUsersSchema);
    
    
    done();
}

module.exports = Routes;