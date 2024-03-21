const SchoolModel = require("../model/schoolModel");

class SchoolAuth {
  async RoleCheckSchool(req, res, next) {
    const isExist = await SchoolModel.findById(req.user.id);
    if (!isExist) return res.send({ message: "Please login as School" });
    if (isExist.role == "SCHOOL") {
      next();
    } else {
      return res.send({ message: "Please login as school" });
    }
  }
}

module.exports = new SchoolAuth().RoleCheckSchool;
