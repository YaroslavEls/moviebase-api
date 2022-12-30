const movie = require('./interfaces/movie.interface');
const genre = require('./interfaces/genre.interface');
const thread = require('./interfaces/thread.interface')

const data_inserting = async() => {
    await movie.create({
        name: 'Fargo',
        description: 'Minnesota car salesman Jerry Lundegaard\'s inept crime falls apart due to his and his henchmen\'s bungling and the persistent police work of the quite pregnant Marge Gunderson.',
        year: 1996
    });
    await movie.create({
        name: 'Who\'s Afraid of Virginia Woolf?',
        description: 'It examines the complexities of the marriage of a middle-aged couple, Martha and George. Late one evening, after a university faculty party, they receive an unwitting younger couple, Nick and Honey, as guests, and draw them into their bitter and frustrated relationship.',
        year: 1966
    });
    await movie.create({
        name: 'The Shawshank Redemption',
        description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency. Chronicles the experiences of a formerly successful banker as a prisoner in the gloomy jailhouse of Shawshank after being found guilty of a crime he did not commit.',
        year: 1994
    });

    await genre.create({
        name: 'Crime'
    });
    await genre.create({
        name: 'Drama'
    });
    await genre.create({
        name: 'Thriller'
    });
    await genre.create({
        name: 'Comedy'
    });
    await genre.create({
        name: 'Historical'
    });
}

module.exports = data_inserting;