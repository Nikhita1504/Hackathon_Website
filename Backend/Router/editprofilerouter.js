const express=require("express");
const { UserModel } = require("../model/db");
const editprofilerouter=express();

editprofilerouter.put("/:email", async(req,res)=>{
    try {
        
        const user=await UserModel.findOne({email:req.params.email})
        const {name,email,bio,college,degree,GraduationYear,skills,githubProfile,linkedinProfile}=req.body;
        if(!user){
           return res.status(404).json({message:"User not found"});
        }
   
        user.name=name|| user.name;
        user.email=email|| user.email;
        user.bio=bio|| user.bio;
        user.college=college|| user.college;
        user.degree=degree|| user.degree;
        user.GraduationYear=GraduationYear|| user.GraduationYear;
        user.skills=skills|| user.skills;
        user.githubProfile=githubProfile|| user.githubProfile;
        user.linkedinProfile=linkedinProfile|| user.linkedinProfile;
   
        await user.save();
   
        res.json(user)
    } catch (error) {

        res.status(500).json({message:"Internal server error"})
        
    }





})

module.exports=editprofilerouter