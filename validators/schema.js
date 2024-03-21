const Joi = require("joi");

const nameRegx = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
const numberRegx = /^[0-9][0-9\s]*$/;
const postal_regex = /^[1-9][0-9]{5}$/;

const schemas = {
  registerSchool: Joi.object().keys({
    SchoolName: Joi.string()
      .min(5)
      .max(255)
      .custom((value, helpers) => {
        if (nameRegx.test(value)) {
          return true;
        } else {
          return helpers.message("School Name must contain only letters");
        }
      })
      .required(),
    RegistrationPhoneNumber: Joi.string()
      .custom((value, helpers) => {
        if (nameRegx.test(value)) {
          return true;
        } else {
          return helpers.message("Not A Valid Phone Number");
        }
      })
      .required(),
  }),
};
