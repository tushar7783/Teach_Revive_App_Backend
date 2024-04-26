const UserModel = require("../model/userModel");
const UserService = require("../services/UserService");

exports.usersignup = async (req, res) => {
  try {
    const { Name, PhoneNumber, email, password, schoolId } = req.body;
    const user = await UserService.register(
      Name,
      PhoneNumber,
      email,
      password,
      schoolId
    );
    if (!user) return res.status(404).json({ Message: "Something went wrong" });

    res.status(200).json({ message: "user added", sucess: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: `Internal server error ` });
  }
};

exports.userlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await UserModel.matchPasswordAndGenrateToken(email, password);
    if (!token)
      return res.status(400).json({ Message: `Something went wrong` });
    res.status(200).json({ message: `User login`, sucess: true, Token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: `Internal server error ` });
  }
};
