const crypto = require('crypto');

let called = {
  create: 0,
  get: 0
};

module.exports.create = () => {
  console.log('Calls to create session', ++called.create);
  return Promise.resolve({ streamfinder: 'cookie!' });
};

module.exports.get = () => {
  console.log('Calls to get session', ++called.get);
  return { streamfinder: 'cookie!' };
};
