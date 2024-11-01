const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const {authrouter} = require("./Router/Authrouter")
const {google_auth_router} = require("./Router/Google_Authcontroller")
const Profilerouter = require("./Router/Profilerouter");
const { UserModel } = require("./model/db");
const homerouter = require("./Router/homerouter");
const editprofilerouter = require("./Router/editprofilerouter");
const hackathondetails = require("./Router/hackathondetails");
const SearchMembers = require("./Router/SearchMembers");
require("dotenv").config();
require("./model/db")

const Port = process.env.Port || 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded())
app.use(cors());
app.use("/auth" , authrouter)
app.use("/google/auth",google_auth_router)
app.use("/profile" , Profilerouter)
app.use("/home",homerouter)
app.use("/hackathon",hackathondetails)
app.use("/add-member",SearchMembers)

// app.use("/home/edit-profile",editprofilerouter)


app.listen(Port, () =>{
  console.log("server is Running")
})

