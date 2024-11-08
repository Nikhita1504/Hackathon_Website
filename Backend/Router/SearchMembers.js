const express = require("express");
const { UserModel } = require("../model/db");
const SearchMembers = express.Router();

SearchMembers.get("/search", async (req, res) => {
  try {
    const { name, college, degree, GraduationYear, skills } = req.query;


    const query = {};


    console.log("Received query params:", req.query);


    if (name) {
      query.name = { $regex: name, $options: "i" }; // Case-insensitive search for name
    }


    if (college) {
      query.college = { $in: Array.isArray(college) ? college : [college] };
    }


    if (degree) {
      query.degree = { $in: Array.isArray(degree) ? degree : [degree] };
    }


    if (GraduationYear) {
      query.GraduationYear = { $in: Array.isArray(GraduationYear) ? graduationYear.map(Number) : [Number(graduationYear)] };
    }


    if (skills) {
      query.skills = { $in: Array.isArray(skills) ? skills : [skills] };
    }


    console.log("Constructed query:", query);

    const suggestions = await UserModel.find(query);


    res.json(suggestions);
  } catch (error) {
    console.error("Error in search endpoint:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = SearchMembers;
