const express = require("express");
const { UserModel } = require("../model/db");
const SearchMembers = express.Router();

SearchMembers.get("/search", async (req, res) => {
  try {
    const { name } = req.query;
    
    const suggestions = await UserModel.find({ name: { $regex: name, $options: "i" } });
    
    res.json(suggestions);
    // console.log(suggestions);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = SearchMembers;
