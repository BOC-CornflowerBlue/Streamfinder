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
    it('Returns an empty array for no parameters', done => {
      let title;
      const resultsExpected = [];
      model.getFuzzySearch(title)
      .then(movies => {
        expect(movies).toEqual(resultsExpected);
      })
      .catch(error => done(error));
    });

    it('Returns an empty array for an empty string', done => {
      const title = '';
      const resultsExpected = [];
      model.getFuzzySearch(title)
      .then(movies => {
        expect(movies).toEqual(resultsExpected);
      })
      .catch(error => done(error));
    });

    it ('Returns an empty array for no matches', done => {
      const title = 'sdclkzdcsdghsjdf';
      const resultsExpected = [];
      model.getFuzzySearch(title)
      .then(movies => {
        expect(movies).toEqual(resultsExpected);
      })
      .catch(error => done(error));
    });


    it ('Returns the matching movie for exact matches of only letters in name', done => {
      const title = 'Iron Man';
      const resultsExpected = [];
      model.getFuzzySearch(title)
      .then(movies => {
        expect(movies).toEqual(resultsExpected);
      })
      .catch(error => done(error));
    });

    // TODO: Partial matches? See capabilities of library
    it ('Returns the matching movie for exact matches with symbols in name', done => {
      // const title = 'Bonnie and Clyde';
      // const title = 'Bonnie & Clyde';
      // const resultsExpected = [];
      // model.getFuzzySearch(title)
      // .then(movies => {
      //   expect(movies).toEqual(resultsExpected);
      // })
      // .catch(error => done(error));
    });

    it ('Returns the matching movie and up to 9 additional related movies for partial matches', done => {

    });

    it ('Returns the closest matching movie for partial matches of only letters in name', done => {

    });

    // TODO: Partial matches? See capabilities of library
    it ('Returns the closest matching movie for partial matches with symbols in name', done => {
      // const title = 'Bonnie and Clyde';
      // const title = 'Bonnie & Clyde';
      // const resultsExpected = [];
      // model.getFuzzySearch(title)
      // .then(movies => {
      //   expect(movies).toEqual(resultsExpected);
      // })
      // .catch(error => done(error));
    });

    it ('Returns the closest matching movie and up to 9 additional related movies for partial matches', done => {

    });

    it ('Does ??? when the fuzzy match library has an error', done => {

    });
  });
});
