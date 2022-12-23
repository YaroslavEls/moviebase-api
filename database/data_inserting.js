const movie = require('./interfaces/movie');
const genre = require('./interfaces/genre');
const thread = require('./interfaces/thread')

const data_inserting = async() => {
    await movie.createMovie({
        name: 'first',
        description: 'the first one',
        year: 2001
    });
    await movie.createMovie({
        name: 'second',
        description: 'the second one',
        year: 2002
    });
    await movie.createMovie({
        name: 'third',
        description: 'the third one',
        year: 2003
    });
    await movie.createMovie({
        name: 'fourth',
        description: 'the fourth one',
        year: 2004
    });
    await movie.createMovie({
        name: 'fifth',
        description: 'the fifth one',
        year: 2005
    });

    await genre.createGenre({
        name: 'qweqwe'
    });
    await genre.createGenre({
        name: 'asdasd'
    });
    await genre.createGenre({
        name: 'zxczxc'
    });
    await genre.createGenre({
        name: 'tryrty'
    });
    await genre.createGenre({
        name: 'fghfgh'
    });

    await thread.createThread({
        title: 'New thread number one',
        text: 'Some text of this thread bumber one lorem',
        movie_name: 'first',
        user_id: 1
    });
    await thread.createThread({
        title: 'New thread number two',
        text: 'Some text of this thread bumber two lorem',
        movie_name: 'second',
        user_id: 1
    });
    await thread.createThread({
        title: 'New thread number three',
        text: 'Some text of this thread bumber three lorem',
        movie_name: 'second',
        user_id: 1
    });
}

module.exports = data_inserting;