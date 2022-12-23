const movieRepo = require('./repository/movieRepo');
const genreRepo = require('./repository/genreRepo');

const data_inserting = async() => {
    await movieRepo.createMovie({
        name: 'first',
        description: 'the first one',
        year: 2001
    });
    await movieRepo.createMovie({
        name: 'second',
        description: 'the second one',
        year: 2002
    });
    await movieRepo.createMovie({
        name: 'third',
        description: 'the third one',
        year: 2003
    });
    await movieRepo.createMovie({
        name: 'fourth',
        description: 'the fourth one',
        year: 2004
    });
    await movieRepo.createMovie({
        name: 'fifth',
        description: 'the fifth one',
        year: 2005
    });

    await genreRepo.createGenre({
        name: 'qweqwe'
    });
    await genreRepo.createGenre({
        name: 'asdasd'
    });
    await genreRepo.createGenre({
        name: 'zxczxc'
    });
    await genreRepo.createGenre({
        name: 'tryrty'
    });
    await genreRepo.createGenre({
        name: 'fghfgh'
    });
}

module.exports = data_inserting;