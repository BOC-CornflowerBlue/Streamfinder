const crypto = require('crypto');

let checks = 0;

module.exports.create = () => {
  console.log('Calls to create session', ++checks);
  return Promise.resolve({ streamfinder: 'cookie!' });
}

module.exports.get = () => {
  console.log('Get session');
  return { streamfinder: 'cookie!' };
}
