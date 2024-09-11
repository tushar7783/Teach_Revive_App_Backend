const express = require("express");
const routes = express.Router();
const UserController = require("../controller/userController");
const jwt_authentication=require("../miidleware/jwtAuthenticate")
const RoleCheckEmployee=require("../miidleware/employeeOnly")

routes.post("/signup", UserController.usersignup);
routes.post("/login", UserController.userlogin);
routes.post("/depositePremium", jwt_authentication, RoleCheckEmployee, UserController.depositePremium);
routes.put("/changerole",jwt_authentication,RoleCheckEmployee,UserController.changerole)
// routes.post("/")

module.exports = routes;
