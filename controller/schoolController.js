const SchoolModel = require("../model/schoolModel");
const SchoolService = require("../services/schoolService");

exports.registerSchool = async (req, res) => {
  try {
    const {
      SchoolName,
      RegistrationPhoneNumber,
      RegistrationEmail,
      RegistrationPassword,
      SchoolAffliationCode,
      Pincode,
      Distrct,
      State,
    } = req.body;

    const School = await SchoolService.register(
      SchoolName,
      RegistrationPhoneNumber,
      RegistrationEmail,
      RegistrationPassword,
      SchoolAffliationCode,
      Pincode,
      Distrct,
      State
    );
    console.log(School);

    res.status(200).json({ message: `School register`, suceess: true });
  } catch (error) {
    console.log(error);
    res.status(500).json(`Internal server error`);
  }
};

exports.SchoolLogin = async (req, res) => {
  try {
    const { RegistrationEmail, RegistrationPassword } = req.body;
    const Token = await SchoolModel.matchPasswordAndGenrateToken(
      RegistrationEmail,
      RegistrationPassword
    );
    if (!Token)
      return res.status(400).json({ Message: `token cannot be created` });

    res
      .status(200)
      .json({ message: `School login sucess`, sucess: true, Token: Token });
  } catch (error) {
    console.log(error);
    res.status(500).json(`Internal server error`);
  }
};
