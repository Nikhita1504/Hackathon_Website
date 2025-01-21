const express = require("express");
const AdminRouter = express.Router();
const { AdminLogin } = require("../AdminController/LoginController");
const CreateAdmin = require("../AdminController/CreateAdminController");

AdminRouter.post("/login", AdminLogin);
AdminRouter.post("/CreateAdmin", CreateAdmin);

module.exports = { AdminRouter };
