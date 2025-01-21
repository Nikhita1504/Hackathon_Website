const express = require("express");
const {
  signupValidation,
  loginValidation,
} = require("../middleware/Authmiddleware");
const { signup, login } = require("../controller/Authcontroller");
const authrouter = express.Router();

authrouter.post("/signup", signupValidation, signup);

authrouter.post("/login", loginValidation, login);

module.exports = { authrouter };
