const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const { authrouter } = require("./Router/Authrouter");
const { google_auth_router } = require("./Router/Google_Authcontroller");
const Profilerouter = require("./Router/Profilerouter");
const homerouter = require("./Router/homerouter");
const hackathondetails = require("./Router/hackathondetails");
const SearchMembers = require("./Router/SearchMembers");
const TeamDetails = require("./Router/TeamDetails");
const CheckEnrollRouter = require("./Router/CheckEnrollRouter");
require("dotenv").config();
require("./model/db");

const { createServer } = require("http");
const { Server } = require("socket.io");

const server = createServer(app); 
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});




const Port = process.env.Port || 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded());
app.use(cors());

// Routes
app.use("/auth", authrouter);
app.use("/google/auth", google_auth_router);
app.use("/profile", Profilerouter);
app.use("/home", homerouter);
app.use("/hackathon", hackathondetails);
app.use("/add-member", SearchMembers);
app.use("/team", TeamDetails); // Attach TeamDetails to main app
app.use("/enroll", CheckEnrollRouter);

server.listen(Port, () => {
  console.log("Server is running on port", Port);
});
