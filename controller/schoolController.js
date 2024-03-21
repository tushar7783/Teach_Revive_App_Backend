const schoolService = require("../services/schoolService");

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
      IsVerified,
    } = req.body;
  }
}

module.exports = schoolController;
