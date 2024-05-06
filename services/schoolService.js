const SchoolModel = require("../model/schoolModel");

class SchoolService {
  static async register() {
    try {
      // console.log("ghsghgdshgshgh");
      // console.log("<<<<<<<<<<<<<<", arguments);
      // const alreadyPresent = await SchoolModel.find({
      //   RegistrationEmail: arguments[2],
      // });
      // if (alreadyPresent) {
      //   return "School is alrready register";
      // }

      const school = await SchoolModel.create({
        SchoolName: arguments[0],
        RegistrationPhoneNumber: arguments[1],
        RegistrationEmail: arguments[2],
        RegistrationPassword: arguments[3],
        SchoolAffliationCode: arguments[4],
        Pincode: arguments[5],
        Distrct: arguments[6],
        State: arguments[7],
      });

      // console.log(arguments);
      if (!school)
        return res.status(404).json({ Messgae: `Something Went Wrong ` });

      return true;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = SchoolService;
