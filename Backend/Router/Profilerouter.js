const express = require("express");
const { Profilecontoller ,EditProfilecontroller } = require("../controller/Profilecontroller");
const Profilerouter = express.Router();

Profilerouter.put("/:email",Profilecontoller)
Profilerouter.put("/edit-profile/:email" , EditProfilecontroller)

module.exports = Profilerouter;