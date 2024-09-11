const UserModel = require("../model/userModel");
const SchoolService = require("../services/schoolService");
const UserService = require("../services/UserService");

exports.usersignup = async (req, res) => {
  try {
    const { Name, PhoneNumber, email, password, schoolId } = req.body;
    const checkForSchool=await SchoolService.checkForSchool(schoolId);
    if(!checkForSchool) res.status(404).json({ Message: "The School is not registred for this program not applicable candidate " });
    const user = await UserService.register(
      Name,
      PhoneNumber,
      email,
      password,
      schoolId
    );
    if (!user) return res.status(404).json({ Message: "Something went wrong" });
    if(user=="No Such School register for this Program") return res.status(200).json({message:"No Such School register for this Program"})

    res.status(200).json({ message: "user added", sucess: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: `Internal server error `, error: error });
  }
};

exports.userlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await UserModel.matchPasswordAndGenrateToken(email, password);
    if (!token)
      return res.status(400).json({ Message: `Something went wrong` });

    if (token == "Plaese register yourself")
      return res.status(400).json({ Message: `Plaese register yourself` });
    res.status(200).json({ message: `User login`, sucess: true, Token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: `Internal server error `, error: error });
  }
};

exports.depositePremium=async(req,res)=>{
  try {

    
    
  } catch (error) {console.log(error);
    res.status(500).send({message:"Internal Server error",error:error})
    
  }
}
exports.changerole=async(req,res)=>{
  try {
    // const user=req.user;
    const updateUser =await UserModel.updateOne(  { userId: req.user.id },
      { $set: { role:"BENEFICIARY" }})
    if(!updateUser) res.status(400).send({message:"Something went wrong"})
    if(updateUser.modifiedCount>0) res.status(200).send({updateUser})
    
    
    
  } catch (error) {console.log(error);
    res.status(500).send({message:"Internal Server error",error:error})
    
  }
}
