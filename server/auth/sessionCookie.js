const crypto = require('crypto');

module.exports.createSession = (req, res, next) => {
  Promise.resolve(req.cookies.streamfinder)
    .then(cookie => {
      if (!cookie) {
        throw cookie;
      }
      // retrieve user data based on session hash stored in cookie
      return getSession({ cookie }); // {cookie: cookie}
    })
    .then(session => {
      if (!session) {
        throw session;
      }

      return session;
    })
    .catch(() => {
      return createSession()
        .then(results => {
          return getSession({ id: results.insertId });
        })
        .then(session => {
          res.cookie('streamfinder', session.hash);
          return session;
        });
    })
    .then (session => {
      // session hash from DB or undefined
      req.session = session;
      next();
    });
};

module.exports.validateSession = (req, res, next) => {
  // Check for cookie
  const cookie = req.cookies.streamfinder;
  if (cookie === undefined) {
    console.log('No cookie');
  } else {
    console.log('Cookie found:', cookie);
  }
  // Look up user's session hash from DB
};