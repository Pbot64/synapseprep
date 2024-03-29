import Validator from 'validator';
import isEmpty from './is-empty';

export default function validateResetInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};