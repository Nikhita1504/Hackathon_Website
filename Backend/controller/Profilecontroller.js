const { UserModel } = require("../model/db") ;

const Profilecontoller = async(req,res) =>{
   try{
    const updatedata = req.body
    delete updatedata.password;
    const email = req.params.email;
    const Updateduser = await UserModel.findOneAndUpdate({email} ,updatedata ,{
      new: true, // Return the updated document
      runValidators: true, // Run validation on update
    });
    if(!Updateduser){
      return res.status(400).json({message:"User not found" , success:false})
    }
    res.status(200).json({message:"Profile save succesfully" , success:true})
   }catch(err){
     res.status(400).json({message:"internal server error" , err ,success:false})
   }
}

module.exports = {Profilecontoller}