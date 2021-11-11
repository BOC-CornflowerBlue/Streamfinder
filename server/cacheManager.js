'use strict';
const { Logger } = require('../logger.js');

const redis = require('redis');
const { promisify } = require('util');
// const config = require('./config/config')

Logger.consoleLog('Creating redis client');
const redisClient = redis.createClient(
  // {
  //     host: config.redis_host,
  //     port: config.redis_port
  // }
);
// const password = null;// = config.redis_password || null;
// if (password && password != 'null') {
//   console.log('Signing in to redis');
//   redisClient.auth(password, (err, res) => {
//       Logger.consoleLog('res', res);
//       Logger.consoleLog('err', err);
//   });
// }

try {
    redisClient.getAsync = promisify(redisClient.get).bind(redisClient);
    redisClient.setAsync = promisify(redisClient.set).bind(redisClient);
    redisClient.lpushAsync = promisify(redisClient.lpush).bind(redisClient);
    redisClient.lrangeAsync = promisify(redisClient.lrange).bind(redisClient);
    redisClient.llenAsync = promisify(redisClient.llen).bind(redisClient);
    redisClient.lremAsync = promisify(redisClient.lrem).bind(redisClient);
    redisClient.lsetAsync = promisify(redisClient.lset).bind(redisClient);
    redisClient.hmsetAsync = promisify(redisClient.hmset).bind(redisClient);
    redisClient.hmgetAsync = promisify(redisClient.hmget).bind(redisClient);
    redisClient.clear = promisify(redisClient.del).bind(redisClient);
} catch (error) {
  Logger.consoleLog('redis error', error);
}

redisClient.on('connected', function () {
  Logger.consoleLog('Redis is connected');
});
redisClient.on('error', function (error) {
  Logger.consoleLog('Redis error.', error);
});

setInterval(function() {
  Logger.consoleLog('Keeping alive - Performance Test with Redis');
    redisClient.set('ping', 'pong');
}, 1000 * 60 * 4);

redisClient.cacheRoute = (idPrefix, params, serviceMethod) => {
  return new Promise((resolve, reject) => {
    const itemKey = `${idPrefix}:${JSON.stringify(params)}`; // TODO: What about sorting order or params to be consistent?

    Logger.consoleLog('Checking redis key for:', itemKey);
    cache.getAsync(itemKey)
    .then(results => {
      if (results) {
        // Logger.consoleLog('Get results from redis cache!');
        resolve({ data: JSON.parse(results) });
      } else {
        // Logger.consoleLog('Checking service method: ', serviceMethod);
        let newItem = '';
        serviceMethod(params)
        .then(results => {
          newItem = results;
          return cache.setAsync(itemKey, JSON.stringify(newItem));
        })
        .then(cacheResponse => {
          Logger.consoleLog("Cache", cacheResponse);
          resolve({ data: newItem });
        })
        .catch(error => reject(error));
      }
    })
    .catch(error => reject(error));
  });
};

global.cache = redisClient;
module.exports = redisClient;