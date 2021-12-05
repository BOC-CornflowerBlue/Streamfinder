const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();

const { model } = require('./fuzzySearchModel.js');

describe('fuzzySearchModel tests', function () {
  // beforeAll(() => {
  //   return new Promise((resolve, reject) => {
  //     postgresInit(() => console.log('Mongo is ready for testing!'))
  //     .then((postgres) => {
  //       postgresDB = postgres;
  //       db = postgresDB.methods;
  //       resolve();
  //     })
  //     .catch(error => {
  //       console.log('Mongo had an error initializing', error);
  //       reject(error);
  //     });
  //   });

  // });

  // afterAll(() => {
  //   return new Promise((resolve, reject) => {
  //     if (postgresDB) {
  //       postgresDB.closeDatabase()
  //       .then(() => {
  //         console.log('Mongo connection has closed');
  //         resolve();
  //       })
  //       .catch(error => {
  //         console.log('Mongo had an error closing', error);
  //         reject(error);
  //       });
  //     } else {
  //       console.log('No instance of postgres exists to close!');
  //       reject();
  //     }
  //   })
  // });

      // let reviewIdFilter = { review_id: reviewExpected.review_id };
      // db.getReview(reviewIdFilter).then(review => {
      //   expect(review).toBeDefined();
      //   expect(review).toEqual(expect.objectContaining(reviewExpected));
      //   done();
      // })
      // .catch(error => done(error));

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

    // TODO: Partial matches? See capabilities of library
    it ('Returns the matching movie for exact matches with symbols in name', (done) => {
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

    it ('Returns the matching movie and up to 9 additional related movies', (done) => {
      const title = 'Iron Man';
      const titleExpected = 'Iron Man 2';

      model.getFuzzySearch(title)
      .then(movies => {
        expect(movies).to.be.a('array');
        expect(movies).to.have.lengthOf(10);
        // TODO: contains check
        expect(movies[0].title).to.equal(titleExpected);
        done();
      })
      .catch(error => done(error));
    });

    it ('Returns the closest matching movie for partial matches of only letters in name', (done) => {
      const title = 'Jurassic';
      const titleExpected = 'Jurassic Park';

      model.getFuzzySearch(title)
      .then(movies => {
        expect(movies).to.be.a('array');
        expect(movies).to.have.lengthOf.at.least(1);
        expect(movies[0].title).to.equal(titleExpected);
        done();
      })
      .catch(error => done(error));
    });
    // TODO: Misspelled movie names

    it ('Returns the closest matching movie for partial matches with symbols in name', (done) => {
      const title = 'Bonnie & Clyd';
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
    // TODO: Misspelled movie names

    it ('Returns the closest matching movie and up to 9 additional related movies for partial matches', (done) => {
      const title = 'Iron Mann';
      const titleExpected = 'Iron Man 2';

      model.getFuzzySearch(title)
      .then(movies => {
        expect(movies).to.be.a('array');
        expect(movies).to.have.lengthOf(10);
        // TODO: contains check
        expect(movies[0].title).to.equal(titleExpected);
        done();
      })
      .catch(error => done(error));
    });

    it ('Does ??? when the fuzzy match library has an error', (done) => {
      const title = 'Iron Man';
      const resultsExpected = ['fail'];

      model.getFuzzySearch(title).should.eventually.equal(resultsExpected);
      done();
    });
  });
});
