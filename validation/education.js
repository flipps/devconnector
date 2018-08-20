const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
  const errors = {};

  data.school = !isEmpty(data.school) ? data.school : ''; // must be a string to be checked by validator
  data.degree = !isEmpty(data.degree) ? data.degree : ''; // must be a string to be checked by validator
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : ''; // must be a string to be checked by validator
  data.from = !isEmpty(data.from) ? data.from : ''; // must be a string to be checked by validator

  if (Validator.isEmpty(data.school)) {
    errors.school = 'school field is required';
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = 'Degree field is required';
  }

  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = 'Field of study field is required';
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = 'From date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
