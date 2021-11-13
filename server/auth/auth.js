const createSessionToken = (username) => {
  return btoa(`{"username": "${username}", "date": ${new Date().getTime()}}`);
};

const session = (token) => {
  const sessionObj = JSON.parse(atob(token));
  const elapsedTime = (new Date().getTime() - sessionObj.date) / 1000;

  if (elapsedTime > 7776000) {
    // Session has expired
    return false;
  }

  return sessionObj;
};

module.exports = { createSessionToken, session };
