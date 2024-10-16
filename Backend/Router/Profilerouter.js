const express = require("express");
const { Profilecontoller } = require("../controller/Profilecontroller");
const Profilerouter = express.Router();

Profilerouter.put("/:email",Profilecontoller)

module.exports = Profilerouter;