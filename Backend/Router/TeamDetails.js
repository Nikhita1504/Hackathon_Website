const express = require("express");
const { UserModel, TeamModel, HackathonModel } = require("../model/db");
const TeamDetails = express.Router();
const cors = require("cors");

TeamDetails.use(cors());

TeamDetails.post("/enroll-team", async (req, res) => {
  try {
    const { hackathonName, teamName, yourEmail } = req.body;

    const userData = await UserModel.findOne({ email: yourEmail });
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const hackathonData = await HackathonModel.findOne({ name: hackathonName });
    if (!hackathonData) {
      return res.status(404).json({ message: "Hackathon not found" });
    }

    const teamData = new TeamModel({
      teamName,
      members: [
        {
          user: userData.id,
          role: "leader",
        },
      ],
      hackathonId: hackathonData.id,
    });

    await teamData.save();

    res.status(201).json({ message: "Team enrolled successfully", team: teamData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

TeamDetails.get("/:teamid", async (req, res) => {
  try {
    const { teamid } = req.params;
    const teamData = await TeamModel.findOne({ _id: teamid }).populate({
      path: "members.user",
      model: "UserModel",
    }).populate('hackathonId');

    if (!teamData) {
      return res.status(404).json({ message: "Team does not exist" });
    }

    res.json(teamData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = TeamDetails;
