const express = require("express");
const SchoolModel = require("../model/schoolModel");
const schoolController=require("../controller/schoolController")

const routes = express.Router();

routes.post("/registration",schoolController.schoolRegister)
  
module.exports = routes;
