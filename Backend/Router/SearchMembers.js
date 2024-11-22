const express = require("express");
const { UserModel } = require("../model/db");
const SearchMembers = express.Router();

SearchMembers.get("/search", async (req, res) => {
  try {
    const { name, college, degree, GraduationYear,skills } = req.query;
    const query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" }; 
    }

    if (college) {
      query.college = { $in: Array.isArray(college) ? college : [college] };
    }

    if (degree) {
      query.degree = { $in: Array.isArray(degree) ? degree : [degree] };
    }

    if (GraduationYear) {
      query.GraduationYear = { $in: Array.isArray(GraduationYear) ? GraduationYear : [GraduationYear] };
    }
    if(skills){
      const parsedSkills = Array.isArray(skills) ? skills : skills ? [skills] : [];
      query.skills = { $elemMatch: { $in: parsedSkills } };
    }

  

    const suggestions = await UserModel.find(query);

    res.json(suggestions);
  } catch (error) {
    console.error("Error in search endpoint:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = SearchMembers;

