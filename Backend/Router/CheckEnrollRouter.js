const express = require("express");
const { TeamModel, UserModel, HackathonModel } = require("../model/db");
const CheckEnrollRouter = express.Router();

CheckEnrollRouter.get(
  "/checkenroll/:email/:hackathonName",
  async (req, res) => {
    try {
      const email = req.params.email;
      const hackathonName = req.params.hackathonName;
      const hackthon = await HackathonModel.findOne({ name: hackathonName });
      const user = await UserModel.findOne({ email });
      const team = await TeamModel.findOne({
        hackathonId: hackthon._id,
        "members.user": user._id,
    });
     
      if (!team) {
        return res.json({
          message: "user not found in any team",
          found: false,
        });
      }
      return res.json({ message: "user found in a team", found: true ,team});
    } catch (error) {
      return res.status(500).json({ message: "internal server eroor", error });
    }
  }
);

module.exports = CheckEnrollRouter;

