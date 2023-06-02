const MovieInterface = require('./interfaces/movie.interface.js');
const GenreInterface = require('./interfaces/genre.interface.js');
const UserInterface = require('./interfaces/user.interface.js');
const ThreadInterface = require('./interfaces/thread.interface.js');
const CommentInterface = require('./interfaces/comment.interface.js');
const CompilationInterface = require('./interfaces/comp.interface.js');
const RatingInterface = require('./interfaces/rating.interface.js');
const crypto = require('node:crypto');

const data_inserting = async () => {
    await GenreInterface.create({
        name: 'Crime'
    });
    await GenreInterface.create({
        name: 'Drama'
    });
    await GenreInterface.create({
        name: 'Thriller'
    });
    await GenreInterface.create({
        name: 'Comedy'
    });
    await GenreInterface.create({
        name: 'Historical'
    });

    await MovieInterface.create({
        name: 'Fargo',
        description: 'Minnesota car salesman Jerry Lundegaard\'s inept crime falls apart due to his and his henchmen\'s bungling and the persistent police work of the quite pregnant Marge Gunderson.',
        year: 1996,
        genres: [1, 2, 3]
    });
    await MovieInterface.create({
        name: 'Who\'s Afraid of Virginia Woolf?',
        description: 'It examines the complexities of the marriage of a middle-aged couple, Martha and George. Late one evening, after a university faculty party, they receive an unwitting younger couple, Nick and Honey, as guests, and draw them into their bitter and frustrated relationship.',
        year: 1966,
        genres: [2, 3, 4]
    });
    await MovieInterface.create({
        name: 'The Shawshank Redemption',
        description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency. Chronicles the experiences of a formerly successful banker as a prisoner in the gloomy jailhouse of Shawshank after being found guilty of a crime he did not commit.',
        year: 1994,
        genres: [1, 2]
    });

    const salt = crypto.randomBytes(16).toString('base64');
    const hash = salt + ':' + crypto.scryptSync('zxc000', salt, 64).toString('base64');

    await UserInterface.create({
        email: 'qweqwe@gmail.com',
        name: 'John',
        password: '123abc'
    });
    await UserInterface.create({
        email: 'asdasd@gmail.com',
        name: 'Claudette',
        password: '987xyz'
    });
    await UserInterface.create({
        email: 'zxczxc@gmail.com',
        name: 'Marcus',
        password: hash,
        role: 'admin'
    });

    await ThreadInterface.create({
        title: 'What is this movie really about?',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        movie_name: 'The Shawshank Redemption',
        user_id: 1,
        is_review: false
    });
    await ThreadInterface.create({
        title: 'Things that should have been removed from movie',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        movie_name: 'The Shawshank Redemption',
        user_id: 3,
        is_review: true
    });
    await ThreadInterface.create({
        title: 'My final review of this movie',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        movie_name: 'Fargo',
        user_id: 2,
        is_review: false
    });

    await CommentInterface.create({
        text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis',
        thread_id: 1,
        user_id: 2
    });
    await CommentInterface.create({
        text: 'et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni',
        thread_id: 1,
        user_id: 3
    });
    await CommentInterface.create({
        text: 'dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam',
        thread_id: 2,
        user_id: 2,
        reply_to: 1
    });
    await CommentInterface.create({
        text: 'eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis',
        thread_id: 3,
        user_id: 2,
        reply_to: 2
    });
    await CommentInterface.create({
        text: 'suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit',
        thread_id: 3,
        user_id: 1,
        reply_to: 3
    });

    await CompilationInterface.create({
        title: 'idunt ut labore et dolore magna aliq',
        desc: 'Lorem ipsum dolor sit idunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        user_id: 1,
    });
    await CompilationInterface.create({
        title: 'xercitation ullamc',
        user_id: 2,
    });
    await CompilationInterface.create({
        title: 'consectetur adipiscing elit',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor im veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        user_id: 2,
    });
    await CompilationInterface.addMovie(1, 1);

    await RatingInterface.create({movie_id: 1, user_id: 1, score: 5});
};

module.exports = data_inserting;
