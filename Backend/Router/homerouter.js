const express = require("express");
const { UserModel, NotificationModel } = require("../model/db");
const homerouter=express.Router()
homerouter.get("/userdata/:email",async(req,res)=>{
    try {
   
 
      const userdata= await UserModel.findOne({email:req.params.email});

      const userNotification = await NotificationModel.find({RecieverUser:userdata._id}).populate('SenderUser') // Populate SenderUser with specific fields (e.g., name and email)
      .populate('RecieverUser') // Populate RecieverUser with specific fields
      .sort({ createdAt: -1 }); 
  
      if(!userdata){
        return res.status(404).json({message:"user not found"})
      }
      res.json({userdata:userdata , userNotification:userNotification})
  
          
      } catch (error) {
          return res.status(500).json({message:"internal server error"})
          
      }
  })
  homerouter.put("/edit-profile/")

module.exports=homerouter