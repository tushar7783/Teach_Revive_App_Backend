const UserModel = require("../model/userModel");

class EmployeeAuth {
  async RoleCheckEmployee(req, res, next) {
    const isExist = await UserModel.findById(req.user.id);
    if (!isExist) return res.send({ message: "Please login as Employee" });
    if (isExist.role == "EMPLOYEE") {
      next();
    } else {
      return res.send({ message: "Please login as Employee" });
    }
  }
}
module.exports = new EmployeeAuth().RoleCheckEmployee;
