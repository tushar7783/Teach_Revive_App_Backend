require("dotenv/config");
const { Schema, model } = require("mongoose");
const { createHmac } = require("crypto");
const { tokenGeneratorSchool } = require("../services/authentication");
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
  salt: {
    type: String,
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
  IsVerified: {
    type: Boolean,
    // required: true,
    default: false,
  },
  role: {
    type: String,
    required: false,
    default: "SCHOOL",
  },

  // token will be added soon
});

SchoolSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("RegistrationPassword")) return;
  const salt = process.env.SALT;
  const hashpassword = createHmac("sha256", salt)
    .update(user.RegistrationPassword)
    .digest("hex");

  this.salt = salt;
  this.RegistrationPassword = hashpassword;
  next();
});

SchoolSchema.static(
  "matchPasswordAndGenrateToken",
  async function (RegistrationEmail, RegistrationPassword) {
    const user = await this.findOne({ RegistrationEmail });
    if (!user) return `Plaese register yourself`;
    const salt = user.salt;
    const userPassword = user.RegistrationPassword;
    const userProvidePasswordHash = createHmac("sha256", salt)
      .update(RegistrationPassword)
      .digest("hex");
    if (userPassword != userProvidePasswordHash) return `Inavalid password`;
    const token = await tokenGeneratorSchool(user);
    return token;
  }
);

const SchoolModel = new model("SchoolInfo", SchoolSchema);

module.exports = SchoolModel;