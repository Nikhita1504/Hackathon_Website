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
  name: { type: String, required: true },
  logo: { type: String, required: true },
  startDate: { type: Date, required: true }, // Flattened date structure
  endDate: { type: Date, required: true },
  status: { type: String, default: 'upcoming' },
  location: { type: String, required: true },
  description: { type: String, required: true },
  eligibility: { type: String, required: true },
  teamSize: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  registration: {
    open: { type: Boolean, default: true },
    deadline: { type: Date, required: true },
  },
  prizes: [{
    name: { type: String, required: true },  
    money: { type: Number, required: true }, 
  }],
  organizers: [{
    name: { type: String, required: true },  
  }],
  participants: [{ type: mongoose.Schema.ObjectId, ref: "Team" }]
}, { timestamps: true });



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



