require("dotenv");
const { Schema, model } = require("mongoose");
const { createHmac } = require("crypto");

const UserSchema = Schema({
  Name: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: Number,
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
    enum: ["EMPLOYEE", "SCHOOL", "BENEFICIARY", "ADMIN"],
    default: "USER",
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

const UserModel = model("user", UserSchema);

module.exports = UserModel;
