const express = require("express");
const SchoolModel = require("../model/schoolModel");
const routes = express.Router();

routes.post("/registration", async (req, res) => {
  const {
    SchoolName,
    RegistrationPhoneNumber,
    RegistrationEmail,
    RegistrationPassword,
    SchoolAffliationCode,
    Pincode,
    Distrct,
    State,
    IsVerified,
  } = req.body;
  const user = await SchoolModel.create({
    SchoolName,
    RegistrationPhoneNumber,
    RegistrationEmail,
    RegistrationPassword,
    SchoolAffliationCode,
    Pincode,
    Distrct,
    State,
    IsVerified,
  });
  res.send(user);
});

module.exports = routes;
