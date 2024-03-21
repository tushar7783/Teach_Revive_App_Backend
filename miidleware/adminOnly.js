const UserModel = require("../model/userModel");

class AdminAuth {
  async RoleCheckAdmin(req, res, next) {
    const isExit = await UserModel.findById(req.user.id);
    if (!isExit) return res.send({ message: "Please login as admin" });
    if (isExit.role == "ADMIN") {
      next();
    } else {
      return res.send({ message: "Please login as admin" });
    }
  }
}
module.exports = new AdminAuth().RoleCheckAdmin;
