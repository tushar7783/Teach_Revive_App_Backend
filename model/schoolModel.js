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
  IsVerified: {
    type: Boolean,
    required: true,
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
  if (!user.isModified("password")) return;
  const salt = process.env.SALT;
  const hashpassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashpassword;
  next();
});

SchoolSchema.static(
  "matchPasswordAndGenrateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) return `Plaese register yourself`;
    const salt = user.salt;
    const userPassword = user.password;
    const userProvidePasswordHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    if (userPassword != userProvidePasswordHash) return `Inavalid password`;
    const token = await tokengenerator(user);
    return token;
  }
);

const SchoolModel = new model("SchoolInfo", SchoolSchema);

module.exports = SchoolModel;
