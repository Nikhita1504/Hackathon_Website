const express = require("express");
const { UserModel, TeamModel, HackathonModel } = require("../model/db");
const TeamDetails = express.Router();
const cors = require("cors");
const mongoose = require("mongoose");
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

    res
      .status(201)
      .json({ message: "Team enrolled successfully", team: teamData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

TeamDetails.get("/teams-list/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const teams = await TeamModel.find({ "members.user": user._id })
      .populate({
        path: "members.user",
        model: "UserModel",
      })
      .populate({
        path: "hackathonId",
        model: "Hackathon",
      });

    // console.log(teams)
    res.json(teams);
  } catch (error) {
    console.error("Error fetching team details:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

TeamDetails.get("/team-details/:teamid", async (req, res) => {
  try {
    const { teamid } = req.params;
    const teamData = await TeamModel.findOne({ _id: teamid })
      .populate({
        path: "members.user",
        model: "UserModel",
      })
      .populate("hackathonId");

    if (!teamData) {
      return res.status(404).json({ message: "Team does not exist" });
    }
    // console.log(teamData)
    res.json(teamData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

TeamDetails.delete("/delete/:teamid", async (req, res) => {
  try {
    let { teamid } = req.params;

    teamid = teamid.trim();

    // console.log("Received teamid:", teamid);
    // console.log(mongoose.Types.ObjectId.isValid(teamid))

    if (!mongoose.Types.ObjectId.isValid(teamid)) {
      return res.status(400).json({ message: "Invalid team ID" });
    }

    const result = await TeamModel.deleteOne({ _id: teamid });

    if (result.deletedCount > 0) {
      res.json({ message: "Team deleted successfully" });
    } else {
      res.status(404).json({ message: "Team not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

TeamDetails.put("/updateTeamMembers", async (req, res) => {
  try {
    const { team_id, newMember } = req.body;

    // Validate inputs
    if (!team_id || !newMember || !newMember.user) {
      return res
        .status(400)
        .json({
          message: "team_id and newMember with user field are required",
        });
    }

    // Convert `newMember.user` to ObjectId if it's a string
    if (typeof newMember.user === "string") {
      newMember.user = new mongoose.Types.ObjectId(newMember.user);
    }

    // Check if the member already exists in the team
    const team = await TeamModel.findById(team_id);

    if (!team) {
      return res
        .status(404)
        .json({ message: "No team found with the given ID" });
    }

    const isMemberExists = team.members.some(
      (member) => member.user.toString() === newMember.user.toString()
    );

    if (isMemberExists) {
      return res
        .status(201)
        .json({ message: "Member already exists in the team" });
    }

    // Add the new member to the team
    team.members.push(newMember);
    await team.save();

    res.status(200).json({ message: "Member added successfully", team });
  } catch (error) {
    console.error("Error updating team members:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = TeamDetails;
