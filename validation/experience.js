const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
  const errors = {};

  data.title = !isEmpty(data.title) ? data.title : ''; // must be a string to be checked by validator
  data.company = !isEmpty(data.company) ? data.company : ''; // must be a string to be checked by validator
  data.from = !isEmpty(data.from) ? data.from : ''; // must be a string to be checked by validator

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Job title field is required';
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = 'Company field is required';
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = 'From date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
