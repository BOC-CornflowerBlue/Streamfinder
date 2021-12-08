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
        expect(movies.title).to.equal(title);
        done();
      })
      .catch(error => done(error));
    });
  });

  describe('getMovieByTitleFuzzySearch', function () {
    it('(6) Returns undefined when the fuzzy match plugin has an error', (done) => {
      let title;

      getMovieByTitleFuzzySearch(title)
      .then(movies => {
        expect(movies).to.be.a('array');
        expect(movies).to.have.lengthOf(0);
        done();
      })
      .catch(error => done(error));
    });
  });
});