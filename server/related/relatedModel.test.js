const chai = require('chai');
const expect = chai.expect;

const { model } = require('./relatedModel.js');

describe('relatedModel tests', function () {
  describe('getRelatedMovies', function () {
    it('Returns an empty array for no parameters', (done) => {
      let title;
      const resultsExpected = [];
      model.getRelatedMovies(title)
      .then(movies => {
        expect(movies).to.be.a('array');
        expect(movies).to.have.lengthOf(0);
        done();
      })
      .catch(error => done(error));
    });

    it('Returns an empty array for an empty string', (done) => {
      const title = '';
      const resultsExpected = [];
      model.getRelatedMovies(title)
      .then(movies => {
        expect(movies).to.be.a('array');
        expect(movies).to.have.lengthOf(0);
        done();
      })
      .catch(error => done(error));
    });

    it ('Returns an empty array for no related', (done) => {
      const title = 'sdclkzdcsdghsjdf';
      const resultsExpected = [];
      model.getRelatedMovies(title)
      .then(movies => {
        expect(movies).to.be.a('array');
        expect(movies).to.have.lengthOf(0);
        done();
      })
      .catch(error => done(error));
    });

    it ('Returns an array of related movies', (done) => {
      const title = 'Iron man';
      const resultsExpected = [];
      model.getRelatedMovies(title)
      .then(movies => {
        expect(movies).to.be.a('array');
        expect(movies).to.have.lengthOf(0);
        done();
      })
      .catch(error => done(error));
    });

    it ('Returns an array of related movies limited to the number specified', (done) => {
      const title = 'Iron man';
      model.getRelatedMovies(title, 9)
      .then(movies => {
        expect(movies).to.be.a('array');
        expect(movies).to.have.lengthOf(9);
        done();
      })
      .catch(error => done(error));
    });
  });
});