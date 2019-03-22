//For all register field checks
const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function registerInputValidate(input) {
  //Keeps all the errors in an object
  let errors = {};

  //Here input fields are set to either the validated entered value or kept as empty
  input.name = !isEmpty(input.name) ? input.name : "";
  input.email = !isEmpty(input.email) ? input.email : "";
  input.password = !isEmpty(input.password) ? input.password : "";
  input.password2 = !isEmpty(input.password2) ? input.password2 : "";

  //All validation checks
  if (!Validator.isLength(input.name, { min: 2, max: 50 })) {
    errors.name = "Name must be at least 2 characters";
  }
  if (Validator.isEmpty(input.name)) {
    errors.name = "Name field is required";
  }
  if (Validator.isEmpty(input.email)) {
    errors.email = "Empty email field";
  }
  if (!Validator.isEmail(input.email)) {
    errors.email = "Incorrect Email";
  }
  if (Validator.isEmpty(input.password)) {
    errors.password = "Empty password field";
  }
  if (!Validator.isLength(input.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (Validator.isEmpty(input.password2)) {
    errors.password2 = "Please re enter the password";
  }
  if (!Validator.equals(input.password, input.password2)) {
    errors.password2 = "Passwords do not match";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
