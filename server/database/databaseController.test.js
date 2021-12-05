const chai = require('chai');
const expect = chai.expect;

const {
  getMovieByTitle,
  getMovieByTitleFuzzySearch
} = require('./databaseController');

describe('databaseController tests', function () {
  describe('getMovieByTitle', function () {
    it('Returns a movie object if the title matches exactly', (done) => {
      let title = 'Iron Man';

      getMovieByTitle(title)
      .then(movies => {
        // expect(movies).to.be.a('array');
        // expect(movies).to.have.lengthOf(1);
        expect(movies.title).to.equal(title);
        done();
      })
      .catch(error => done(error));
    });
  });

  describe('getMovieByTitleFuzzySearch', function () {
    it('Returns undefined when the fuzzy match library has an error', (done) => {
      let title;

      getMovieByTitleFuzzySearch(title)
      .then(movies => {
        expect(movies).to.be.an('undefined');
        done();
      })
      .catch(error => done(error));
    });
  });
});