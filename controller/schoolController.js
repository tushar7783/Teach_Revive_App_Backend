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
      res.status(200).json({ message: error, suceess: true });
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
      // if (School == "School is alrready register") {
      //   res
      //     .status(200)
      //     .json({ message: "School is alrready register", sucess: true });
      // }
      if (School) {
        res
          .status(200)
          .json({ message: `School register successfully`, suceess: true });
      } else {
        res.status(400).json({ message: `School is alrready register` });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Internal server error`, error: error });
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
    if (Token == "Plaese register yourself")
      return res.status(400).json({ Message: `Plaese register yourself` });

    res
      .status(200)
      .json({ message: `School login sucess`, sucess: true, Token: Token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Internal server error`, error: error });
  }
};
