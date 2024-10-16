const mongoose = require("mongoose");
require('dotenv').config(); 
const URL = process.env.URL;

mongoose.connect(URL).then(() =>{
  console.log("database connected");
}).catch((e) =>{
  console.log("database connection error",e);
})
 
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
     
    },
    profilePicture: {
      type: String, 
      default:""  , 
    },
    college: {
      type: String,
      default:"",
     
    },
    degree: {
      default:"",
      type: String, 
      
    },
    GraduationYear: {
      type: Number, 
      default:""
    
    },
    skills: [String], 
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
    },
    bio: {
      default:"",
      type: String, 
      maxlength: 500,
    },
    githubProfile: {
      type:String,
      default:""
      },
    linkedinProfile:{
      type:String,
      default:""} ,
    isAdmin: {
      type: Boolean,
      default: false,
    },
  }, 
  { timestamps: true }
);

const UserModel = mongoose.model("UserModel" , userSchema)

module.exports= {UserModel};



