const express = require("express");
const { UserModel } = require("../model/db");
const homerouter=express.Router()
homerouter.get("/userdata/:email",async(req,res)=>{
    try {
    console.log("hello")

      const userdata= await UserModel.findOne({email:req.params.email})
      console.log(userdata)
      if(!userdata){
        return res.status(404).json({message:"user not found"})
      }
      res.json(userdata)
  
          
      } catch (error) {
          return res.status(500).json({message:"internal server error"})
          
      }
  })
  homerouter.put("/edit-profile/")

module.exports=homerouter