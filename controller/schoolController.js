const SchoolModel = require("../model/schoolModel");

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
    const School = await SchoolModel.create({
      SchoolName,
      RegistrationPhoneNumber,
      RegistrationEmail,
      RegistrationPassword,
      SchoolAffliationCode,
      Pincode,
      Distrct,
      State,
    });
    if (!School)
      return res
        .status(400)
        .send(`Please provide the above details for the School registration `);

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
