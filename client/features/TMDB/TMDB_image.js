class TMDB_image {
  constructor(endpoint) {
    this.baseURL = 'https://image.tmdb.org/t/p/';
    this.s = this.baseURL + 'w200' + endpoint;
    this.m = this.baseURL + 'w500' + endpoint;
    this.l = this.baseURL + 'original' + endpoint;
  }
};

export default TMDB_image;
