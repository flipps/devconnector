const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  const errors = {};

  data.email = !isEmpty(data.email) ? data.email : ''; // must be a string to be checked by validator
  data.password = !isEmpty(data.password) ? data.password : ''; // must be a string to be checked by validator

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
