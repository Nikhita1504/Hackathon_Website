const express = require("express");
const { UserModel, TeamModel, HackathonModel } = require("../model/db");
const TeamDetails = express.Router();

TeamDetails.post("/enroll-team", async (req, res) => {
    try {
        const { hackathonName, teamName, Yourname, yourEmail } = req.body;


        const userData = await UserModel.findOne({ email: yourEmail });
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        const hackathonData = await HackathonModel.findOne({ name: hackathonName });
        if (!hackathonData) {
            return res.status(404).json({ message: "Hackathon not found" });
        }


        const teamData = new TeamModel({
            teamName: teamName,
            members: [
                {
                    user: userData.id,
                    role: "leader"
                }
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

module.exports = TeamDetails;


