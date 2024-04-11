const express = require("express");
const routes = express.Router();
const UserController = require("../controller/userController");

routes.post("/signup", UserController.usersignup);
routes.post("/login", UserController.userlogin);
module.exports = routes;
