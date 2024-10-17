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

const hackathonschema = new mongoose.Schema({
  name:String,
  description: String,
  startDate: Date,
  endDate: Date,
  maxTeamSize: Number,
  minTeamSize: Number,
  status: String, // upcoming/ongoing/closed
  participants:[{type:mongoose.Schema.ObjectId , ref:"Team"}]
}
);

const teamschema = new mongoose.Schema({
  teamName: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteUser' }],
  leaderId: { type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteUser' },
  hackathonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hackathon' },
  createdAt: Date,
})




const UserModel = mongoose.model("UserModel" , userSchema)
const HackathonModel = mongoose.model("Hackathon",hackathonschema)
const TeamModel = mongoose.model("Team" ,teamschema )

module.exports= {UserModel , HackathonModel , TeamModel};



