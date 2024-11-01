const express = require("express");
const { HackathonModel } = require("../model/db");
const hackathondetails = express.Router();

hackathondetails.post("/hackathondetails", async (req, res) => {
    console.log(req.body);
    try {
        console.log("hello");

        const newHackathon = new HackathonModel({
            name: req.body.name,
            logo: req.body.logo,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            status: req.body.status,
            location: req.body.location,
            description: req.body.description,
            eligibility: req.body.eligibility,
            teamSize: {
                min: req.body.teamSize.min,
                max: req.body.teamSize.max,
            },
            registration: {
                open: req.body.registration.open,
                deadline: req.body.registration.deadline,
            },
            prizes: req.body.prizes.map(prize => ({
                name: prize.name,
                money: prize.money,
            })),
            organizers: req.body.organizers.map(organizer => ({
                name: organizer.name,
            })),
        });

        await newHackathon.save();
        console.log("saved");
        res.status(201).json({ message: "Hackathon saved successfully" });

    } catch (error) {
        console.error("Error saving hackathon:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

hackathondetails.get("/upcominghackathon",async(req,res)=>{
    try {
        const upcominghackathonData= await HackathonModel.find({});
        res.status(201).json(upcominghackathonData)
        
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})
hackathondetails.get("/:hackathonName",async(req,res)=>{
    try {
        const {hackathonName}=req.params;
        const upcominghackathonData= await HackathonModel.findOne({name:hackathonName});
        res.status(201).json(upcominghackathonData)
        
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})



module.exports = hackathondetails;
