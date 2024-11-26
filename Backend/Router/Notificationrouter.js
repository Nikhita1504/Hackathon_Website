const express = require("express");
const { NotificationModel } = require("../model/db");
const NotificationRouter = express.Router();
const mongoose = require("mongoose")

NotificationRouter.delete("/delete/:NotificationId", async (req, res) => {
  var ID = req.params.NotificationId;
  console.log("id" , ID)
  try {
    if (typeof ID === "string") {
      ID = new mongoose.Types.ObjectId(ID );  // Convert to ObjectId if it's a string
    }

    const deletedNotification = await NotificationModel.findByIdAndDelete(ID);

    if (!deletedNotification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json({
      message: "Notification deleted successfully",
      data: deletedNotification, // Returns the deleted document
    });
  } catch (error) {
    console.error("Error deleting notification:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = NotificationRouter