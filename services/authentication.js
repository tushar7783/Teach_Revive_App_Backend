const jwt = require("jsonwebtoken");
const secrete = process.env.SECRETE_KEY;

const tokenGenerator = async (user) => {
  const payload = {
    email: user.email,
    id: user._id,
    role: user.role,
    profileImageUrl: user.profileImageUrl,
    PhoneNumber: user.PhoneNumber,
  };
  const token = jwt.sign(payload, secrete, {
    expiresIn: "365d",
  });
  return token;
};
const tokenGeneratorSchool = async (user) => {
  const payload = {
    SchoolName: user.SchoolName,
    RegistrationEmail: user.RegistrationEmail,
    id: user._id,
    role: user.role,
    profileImageUrl: user.profileImageUrl,
    RegistrationPhoneNumber: user.RegistrationPhoneNumber,
  };
  const token = jwt.sign(payload, secrete, {
    expiresIn: "365d",
  });
  return token;
};

const tokenVerification = async (token) => {
  const payload = jwt.verify(token, secrete);
  return payload;
};
module.exports = { tokenGenerator, tokenVerification, tokenGeneratorSchool };
