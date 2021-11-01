import TMDB_image from './TMDB_image.js';
import 'regenerator-runtime/runtime';

describe('Test TMDB_image class', () => {
  it('Should create a meaningful URL when given an endpoint', () => {
    const imageURL = new TMDB_image('/test');
    // console.log(imageURL.size('s'));
    expect(imageURL.s).toBe('https://image.tmdb.org/t/p/w200/test');
  });
});
