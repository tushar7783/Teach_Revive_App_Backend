const express = require("express");
// const SchoolModel = require("../model/schoolModel");
const SchoolController = require("../controller/schoolController");
const routes = express.Router();

routes.post("/registration", SchoolController.registerSchool);
routes.post("/login", SchoolController.SchoolLogin);

module.exports = routes;
