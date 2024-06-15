// validating request
const {validationResult} = require('express-validator');

module.exports = (req, res, next) => {
  const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
  if (!errors.isEmpty()) {
    next({
      status: "error",
      statusCode: 400,
      message: "BODY_QUERY_PARAMS_ERROR",
      data: errors.array()
    })
  }
  next();
};
