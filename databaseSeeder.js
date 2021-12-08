const { Logger } = require('./logger.js');
const { Movie } = require('./server/database/database.js');
const { getMovie } = require('./server/search/searchDB.js');

const existingMovieTitles = new Set();
const moviesToBeAdded = new Set();

const addMovieIfNew = (movieTitle) => {
  if (!existingMovieTitles.has(movieTitle)) {
    // Logger.consoleLog(`'Adding "${movieTitle}"`);
    moviesToBeAdded.add(movieTitle);
  }
};

const addMoviesIfNew = (movies) => {
  movies.forEach(movie => {
    addMovieIfNew(movie.title);
  })
}

const saveMovie = (movieTitle) => {
  return new Promise((resolve, reject) => {
    const movieDoc = new Movie();
    movieDoc.title = movieTitle;
    movieDoc.save()
    .then(result => {
      Logger.consoleLog('Saved: ', result);
      resolve();
    })
    .catch(error => {
      Logger.consoleLog('Error saving movie: ', error);
      reject();
    });
  })
}

const findMovie = (movieTitle) => {
  Movie.find({ title: movieTitle })
  .then(result => Logger.consoleLog('Movie returned: ', result))
  .catch(error => {
    Logger.consoleLog('Error finding movie: ', error);
  });
}

const addMoviesSequentially = (promiseCB) => {
  [...moviesToBeAdded].reduce(
    (previous, current, currentIndex) => previous.then(() => promiseCB(current)),
    Promise.resolve()
  );
};

const getNumberOfMovies = () => {
  Movie.find()
  .then(movies => Logger.consoleLog(movies.length))
  .catch(error => Logger.consoleLog('Error getting number of movies', error));
}

const seedDatabaseMovies = (movieLimit, dryRun = false) => {
  Movie.find()
  .then(movies => {
    movies.forEach(movie => {
      existingMovieTitles.add(movie.title);
    });
    const numberOfExistingMovies = existingMovieTitles.size;
    Logger.consoleLog(`Movies currently in DB: ${numberOfExistingMovies}`);

    if (numberOfExistingMovies >= movieLimit) {
      Logger.consoleLog('DB has a sufficient number of movie records');
      return numberOfExistingMovies;
    }

    movies.forEach(movie => {
      addMoviesIfNew(movie.suggested);
      addMoviesIfNew(movie.trending);
    });
    const numberOfNewMovies = moviesToBeAdded.size;
    Logger.consoleLog(`Movies to be added to DB: ${numberOfNewMovies}`);

    const totalMovies = numberOfExistingMovies + numberOfNewMovies;
    Logger.consoleLog(`Movies expected to be in DB after add: ${totalMovies}`);

    if (!dryRun) {
      addMoviesSequentially(saveMovie);
      // addMoviesSequentially(getMovie);
      // let moviesList = [...moviesToBeAdded];
      // const movie = moviesList[1];
      // getMovie(movie)
      // .then(() => {
      //   Logger.consoleLog(`${numberOfNewMovies} movies added to DB`);
      //   Logger.consoleLog(`${movie} movie added to DB`);
      //   return totalMovies;
      // });



      // for (let i = 0; i < Math.min(10, moviesList.length); i++) {
      //   getMovie();
      // }

    } else {
      return movieLimit + 1;
    }
  })
  .catch(error => Logger.consoleLog('Error in compiling movies from DB', error));
}

const limit = 1000;
let cliArguments = process.argv.slice(2);
// Logger.consoleLog('cliArguments: ', cliArguments);
const dryRun = (cliArguments[0] === 'dryRun');
// seedDatabaseMovies(limit, dryRun);
getNumberOfMovies();

// seedDatabaseMoviesToLimit(limit, dryRun);