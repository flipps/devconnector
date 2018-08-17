const Validator = require('validator');
const isEmpty = require('./is-empty');
/**
 * TODO:
 * - Validation is not working!
 */

module.exports = function validateProfileInput(data) {
  const errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : ''; // must be a string to be checked by validator
  data.status = !isEmpty(data.status) ? data.status : ''; // must be a string to be checked by validator
  data.skills = !isEmpty(data.skills) ? data.skills : ''; // must be a string to be checked by validator

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to between 2 and 4 characters.';
  }

  if (!Validator.isEmpty(data.handle)) {
    errors.handle = 'Handle field is required.';
  }

  if (!Validator.isEmpty(data.status)) {
    errors.status = 'Status field is required.';
  }

  if (!Validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required.';
  }

  //not required fields
  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = 'Not a valid URL.';
    }
  }
  // not required fields social
  if (!isEmpty(data.youtbe)) {
    if (!Validator.isURL(data.youtbe)) {
      errors.youtbe = 'Not a valid URL.';
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL.';
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL.';
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = 'Not a valid URL.';
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid URL.';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
