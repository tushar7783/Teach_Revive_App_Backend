require("dotenv/config");
const { Schema, model } = require("mongoose");
const { createHmac } = require("crypto");
const { tokenGenerator } = require("../services/authentication");
const UserSchema = Schema({
  Name: {
    type: String,
    required: true,
  },

  PhoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  salt: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  profileImageUrl: {
    type: String,
    // required: true,f=
    default: "/images/Avatar.png",
  },
  role: {
    type: String,
    enum: ["EMPLOYEE", "BENEFICIARY"],
    default: "EMPLOYEE",
  },
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "SchoolInfo",
  },
  Isverifed: {
    type: Boolean,
    default: false,
  },

  // token will add soon
});
UserSchema.pre("save", function (next) {
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

UserSchema.static(
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
    const token = await tokenGenerator(user);
    return token;
  }
);

const UserModel = model("user", UserSchema);

module.exports = UserModel;
