require("dotenv");
const { Schema, model } = require("mongoose");

const SchoolSchema = new Schema({
  SchoolName: {
    type: String,
    required: true,
  },

  RegistrationPhoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  RegistrationEmail: {
    type: String,
    required: true,
    unique: true,
  },
  RegistrationPassword: {
    type: String,
    required: true,
  },

  SchoolAffliationCode: {
    type: String,
    required: true,
  },
  Pincode: {
    type: String,
    required: true,
  },
  Distrct: {
    type: String,
    required: true,
  },
  State: {
    type: String,
    required: true,
  },
  IsVerified:{
    type: Boolean,
    required: true,

  }

  // token will be added soon
});

 
const SchoolModel = new model("SchoolInfo", SchoolSchema);

module.exports = SchoolModel;
