const Joi = require("joi");

const nameRegx = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
const numberRegx = /^[0-9][0-9\s]*$/;
const postal_regex = /^[1-9][0-9]{5}$/;
const emailRegx =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,20}$/;

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
        if (numberRegx.test(value)) {
          return true;
        } else {
          return helpers.message("Not A Valid Phone Number");
        }
      })
      .required(),
    RegistrationEmail: Joi.string()
      .custom((value, helpers) => {
        if (emailRegx.test(value)) {
          return true;
        } else {
          return helpers.message("Not A Valid Email id");
        }
      })
      .required(),
    RegistrationPassword: Joi.string()
      .custom((value, helpers) => {
        if (passwordPattern.test(value)) {
          return true;
        } else {
          return helpers.message("Not A Valid password");
        }
      })
      .required(),
    SchoolAffliationCode: Joi.string().required(),
    Pincode: Joi.string()
      .custom((value, helpers) => {
        if (postal_regex.test(value)) {
          return true;
        } else {
          return helpers.message("Not A Valid Pincode");
        }
      })
      .required(),
    District: Joi.string().required(),
    State: Joi.string().required(),
  }),
};
module.exports=schemas
