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

TeamDetails.get("/:teamid", async (req, res) => {
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

    res.json(teamData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// TeamDetails.put("/updateTeamMembers", async (req, res) => {
//   try {
//     const { team_id, newMember } = req.body;
//     if (typeof newMember.user === "string") {
//       newMember.user = new mongoose.Types.ObjectId(newMember.user); // Convert to ObjectId if it's a string
//     }
//     const Alreadyexists = await TeamModel.findOne({
//       user: newMember.user,
//     });

//     if (Alreadyexists) {
//       return res.status(404).json("Member already exits in team");
//     }

//     if (!team_id || !newMember) {
//       return res
//         .status(400)
//         .json({ message: "team_id and newMember are required" });
//     }

//     const team = await TeamModel.findOneAndUpdate(
//       { _id: team_id },
//       { $push: { members: newMember } }
//     );
//     console.log(team);

//     if (!team) {
//       return res
//         .status(404)
//         .json({ message: "No team found with the given ID" });
//     }

//     res.status(200).json({ message: "Member added successfully", team });
//   } catch (error) {
//     console.error("Error updating team members:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });
TeamDetails.put("/updateTeamMembers", async (req, res) => {
  try {
    const { team_id, newMember } = req.body;

    // Validate inputs
    if (!team_id || !newMember || !newMember.user) {
      return res
        .status(400)
        .json({ message: "team_id and newMember with user field are required" });
    }

    // Convert `newMember.user` to ObjectId if it's a string
    if (typeof newMember.user === "string") {
      newMember.user = new mongoose.Types.ObjectId(newMember.user);
    }

    // Check if the member already exists in the team
    const team = await TeamModel.findById(team_id);
   
    if (!team) {
      return res.status(404).json({ message: "No team found with the given ID" });
    }

    const isMemberExists = team.members.some(
      (member) => member.user.toString() === newMember.user.toString()
    );
    

    if (isMemberExists) {
     
      return res.status(201).json({ message: "Member already exists in the team" });
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
