const UserModel = require("../model/userModel");

class BeneficiaryAuth {
  async RoleCheckBeneficiary(req, res, next) {
    const isExist = await UserModel.findById(req.user.id);
    if (!isExist) return res.send({ message: "Please login as Beneficiary" });
    if (isExist.role == "BENEFICIARY") {
      next();
    } else {
      return res.send({ message: "Please login as Beneficiary" });
    }
  }
}
module.exports = new EmployeeAuth().RoleCheckEmployee;
