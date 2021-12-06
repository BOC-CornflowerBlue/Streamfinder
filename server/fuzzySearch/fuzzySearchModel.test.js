const chai = require('chai');
const expect = chai.expect;

const { model } = require('./fuzzySearchModel.js');

describe('fuzzySearchModel tests', function () {

  describe('getFuzzySearch', function () {
    it('Returns an empty array for no parameters', (done) => {
      let title;

      model.getFuzzySearch(title)
      .then(movies => {
        expect(movies).to.be.a('array');
        expect(movies).to.have.lengthOf(0);
        done();
      })
      .catch(error => done(error));
    });

    it('Returns an empty array for null', (done) => {
      let title = null;

      model.getFuzzySearch(title)
      .then(movies => {
        expect(movies).to.be.a('array');
        expect(movies).to.have.lengthOf(0);
        done();
      })
      .catch(error => done(error));
    });

    it('Returns an empty array for booleans', (done) => {
      let title = true;

      model.getFuzzySearch(title)
      .then(movies => {
        expect(movies).to.be.a('array');
        expect(movies).to.have.lengthOf(0);
        done();
      })
      .catch(error => done(error));
    });

    it('Returns an empty array for numbers', (done) => {
      let title = 0;

      model.getFuzzySearch(title)
      .then(movies => {
        expect(movies).to.be.a('array');
        expect(movies).to.have.lengthOf(0);
        done();
      })
      .catch(error => done(error));
    });

    it('Returns an empty array for arrays', (done) => {
      let title = ['Iron Man'];

      model.getFuzzySearch(title)
      .then(movies => {
        expect(movies).to.be.a('array');
        expect(movies).to.have.lengthOf(0);
        done();
      })
      .catch(error => done(error));
    });

    it('Returns an empty array for objects', (done) => {
      let title = { title: 'Iron Man' };

      model.getFuzzySearch(title)
      .then(movies => {
        expect(movies).to.be.a('array');
        expect(movies).to.have.lengthOf(0);
        done();
      })
      .catch(error => done(error));
    });

    it('Returns an empty array for an empty string', (done) => {
      const title = '';

      model.getFuzzySearch(title)
      .then(movies => {
        expect(movies).to.be.a('array');
        expect(movies).to.have.lengthOf(0);
        done();
      })
      .catch(error => done(error));
    });

    it ('Returns an empty array for no matches', (done) => {
      const title = 'sdclkzdcsdghsjdf';

      model.getFuzzySearch(title)
      .then(movies => {
        expect(movies).to.be.a('array');
        expect(movies).to.have.lengthOf(0);
        done();
      })
      .catch(error => done(error));
    });

    it ('Returns the matching movie for exact matches of only letters in name', (done) => {
      const title = 'Iron Man';
      const titleExpected = 'Iron Man';

      model.getFuzzySearch(title)
      .then(movies => {
        expect(movies).to.be.a('array');
        expect(movies).to.have.lengthOf.at.least(1);
        expect(movies[0].title).to.equal(titleExpected);
        done();
      })
      .catch(error => done(error));
    });

    it ('Returns the matching movie for exact matches with symbols in name', (done) => {
      const title1 = 'Ben-Hur';
      const title2 = 'It\'s a Wonderful Life';

      Promise.all([
        model.getFuzzySearch(title1),
        model.getFuzzySearch(title2)
      ])
      .then(movies => {
        expect(movies[0]).to.be.a('array');
        expect(movies[0]).to.have.lengthOf.at.least(1);
        expect(movies[0][0].title).to.equal(title1);

        expect(movies[1]).to.be.a('array');
        expect(movies[1]).to.have.lengthOf.at.least(1);
        expect(movies[1][0].title).to.equal(title2);

        done();
      })
      .catch(error => done(error));
    });

    it ('Returns the matching movie and up to 9 additional related movies', (done) => {
      const title = 'indiana jones and the last crusade';
      const titleExpected = 'indiana jones and the last crusade';

      model.getFuzzySearch(title)
      .then(movies => {
        expect(movies).to.be.a('array');
        expect(movies).to.have.lengthOf.at.least(5);
        // TODO: contains check
        expect(movies[0].title.toLowerCase()).to.equal(titleExpected.toLowerCase());
        done();
      })
      .catch(error => done(error));
    });

    it ('Returns the closest matching movie for partial matches of only letters in name', (done) => {
      const title = 'Peter';
      const titleExpected = 'Peter Pan';

      model.getFuzzySearch(title)
      .then(movies => {
        expect(movies).to.be.a('array');
        expect(movies).to.have.lengthOf.at.least(1);
        expect(movies[0].title).to.equal(titleExpected);
        done();
      })
      .catch(error => done(error));
    });

    it ('Returns the closest matching movie for partial matches of only letters in misspelled name', (done) => {
      const title = 'Petr Pan';
      const titleExpected = 'Peter Pan';

      model.getFuzzySearch(title)
      .then(movies => {
        expect(movies).to.be.a('array');
        expect(movies).to.have.lengthOf.at.least(1);
        expect(movies[0].title).to.equal(titleExpected);
        done();
      })
      .catch(error => done(error));
    });

    it ('Returns the closest matching movie for partial matches with symbols causing mismatch', (done) => {
      const title = 'Iron@man$%';
      const titleExpected = 'Iron Man';

      model.getFuzzySearch(title)
      .then(movies => {
        expect(movies).to.be.a('array');
        expect(movies).to.have.lengthOf.at.least(1);
        expect(movies[0].title).to.equal(titleExpected);
        done();
      })
      .catch(error => done(error));
    });

    it ('Returns the closest matching movie for partial matches with symbols in name', (done) => {
      const title = 'Bonnie & Clyde';
      const titleExpected = 'Bonnie and Clyde';

      model.getFuzzySearch(title)
      .then(movies => {
        expect(movies).to.be.a('array');
        expect(movies).to.have.lengthOf.at.least(1);
        expect(movies[0].title).to.equal(titleExpected);
        done();
      })
      .catch(error => done(error));
    });

    it ('Returns the closest matching movie and up to 9 additional related movies for partial matches', (done) => {
      const title = 'indiana jones & the last crusade';
      const titleExpected = 'indiana jones and the last crusade';

      model.getFuzzySearch(title)
      .then(movies => {
        expect(movies).to.be.a('array');
        expect(movies).to.have.lengthOf.at.least(5);
        // TODO: contains check
        expect(movies[0].title.toLowerCase()).to.equal(titleExpected.toLowerCase());
        done();
      })
      .catch(error => done(error));
    });
  });
});
