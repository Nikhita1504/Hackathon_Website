const mongoose = require("mongoose");
require("dotenv").config();
const AdminURL = process.env.AdminURL;

const Admindb=mongoose.createConnection(AdminURL);
Admindb.on("connected", () => console.log("Admin database Connected "));



const adminSchema = new mongoose.Schema({
  name:{
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
    required: true,
  },
  role: {
    type: String,
    enum: ['SuperAdmin' , 'Admin'],
    default: 'Admin',
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AdminModel = Admindb.model('Admin', adminSchema);

module.exports = {AdminModel};


