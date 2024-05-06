const SchoolModel = require("../model/schoolModel");
const SchoolService = require("../services/schoolService");
const joiOptions = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};
const joischema = require("../validators/schema");

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

    const { error } = joischema.registerSchool.validate(req.body, joiOptions);

    if (error) {
      res.status(400).json({ message: error, suceess: true });
    } else {
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
      if (School) {
        res
          .status(200)
          .json({ message: `School register successfully`, suceess: true });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(`Internal server error`);
  }
};

exports.SchoolLogin = async (req, res) => {
  try {
    const { RegistrationEmail, RegistrationPassword } = req.body;
<<<<<<< HEAD
    const Token = await SchoolModel.matchPasswordAndGenrateToken(
      RegistrationEmail,
      RegistrationPassword
    );
    if (!Token)
      return res.status(400).json({ Message: `token cannot be created` });
    if (Token == "Plaese register yourself")
      return res.status(400).json({ Message: `Plaese register yourself` });
=======
    const { error } = joischema.LoginSchool.validate(req.body, joiOptions);
    if (error) {
      res.status(400).json({ message: error, suceess: true });
    } else {
      const Token = await SchoolModel.matchPasswordAndGenrateToken(
        RegistrationEmail,
        RegistrationPassword
      );
      if (!Token)
        return res.status(400).json({ Message: `token cannot be created` });
>>>>>>> refs/remotes/origin/main

      res
        .status(200)
        .json({ message: `School Login Sucess`, sucess: true, Token: Token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(`Internal server error`);
  }
};
