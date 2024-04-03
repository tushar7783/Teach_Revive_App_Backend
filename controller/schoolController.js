const schoolService = require("../services/schoolService");
const Schema = require("../validators/schema");
const joiOptions = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};
class schoolController extends schoolService {
  constructor() {
    super();
  }
  static async schoolRegister(req, res) {
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
    const { error } = Schema.registerSchool.validate(req.body, joiOptions);
    if (error) {
      return res.send(error);
    } else {
      const result = await schoolService.registerSchool(
        SchoolName,
        RegistrationPhoneNumber,
        RegistrationEmail,
        RegistrationPassword,
        SchoolAffliationCode,
        Pincode,
        Distrct,
        State
      );
      return res.send(result);
    }
  }
}

module.exports = schoolController;
