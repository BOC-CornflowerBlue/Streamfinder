const {
  sendErrorResponse
} = require("../helpers");

exports.validateLogin = (req, res, next) => {
  const login = req.body;
  let message = '';

  // TODO: Complete placeholder function below
  const isValidLogin = (login) => true;

  if (!isValidLogin(login)) {
    return sendErrorResponse({res, statusCode: 400, message});
  } else {
    return next();
  }
};

exports.validateUser = (req, res, next) => {
  const user = req.body;
  let message = '';

  // TODO: Complete placeholder function below
  const isValidUser = (user) => true;

  if (!isValidUser(user)) {
    return sendErrorResponse({res, statusCode: 400, message});
  } else {
    return next();
  }
};

// TODO: Make validators for empty params for each route