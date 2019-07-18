import Validator from "validator";
import isEmpty from "./is-empty";

export default function validateUpdateAccountInput(data) {
  console.log(data);
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
