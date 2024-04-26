const UserModel = require("../model/userModel");

class UserService {
  static async register() {
    try {
      const user = await UserModel.create({
        Name: arguments[0],
        PhoneNumber: arguments[1],
        email: arguments[2],
        password: arguments[3],
        schoolId: arguments[4],
      });
      if (!user)
        return res.status(404).json({ Message: `Someting Went Wrong` });

      return true;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserService;
