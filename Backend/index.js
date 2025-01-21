

const express = require("express");
const app = express();
const bodyparser = require("body-parser");
app.use('/public', express.static('public'));
const cors = require("cors");
const { authrouter } = require("./Router/Authrouter");
const { google_auth_router } = require("./Router/Google_Authcontroller");
const Profilerouter = require("./Router/Profilerouter");
const homerouter = require("./Router/homerouter");
const hackathondetails = require("./Router/hackathondetails");
const SearchMembers = require("./Router/SearchMembers");
const TeamDetails = require("./Router/TeamDetails");
const CheckEnrollRouter = require("./Router/CheckEnrollRouter");
const Notificaitonrouter = require("./Router/Notificationrouter")
require("dotenv").config();
require("./model/db");
require("./model/Admindb");

const { createServer } = require("http");
const server = createServer(app);

const {hello} = require("./Socket"); // Import the function correctly
const ImageUpload = require("./Router/ImageUpload");
const { AdminRouter } = require("./Admin/AdminRouter");

   hello(server); // Call the function to initialize socket

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    methods: ["POST", "GET", "PUT", "DELETE"],
    origin: "http://localhost:5174",
  })
);

// Define routes
app.use("/auth", authrouter);
app.use("/google/auth", google_auth_router);
app.use("/profile", Profilerouter);
app.use("/home", homerouter);
app.use("/hackathon", hackathondetails);
app.use("/add-member", SearchMembers);
app.use("/team", TeamDetails);
app.use("/enroll", CheckEnrollRouter);
app.use("/upload",ImageUpload);
app.use("/Notification" , Notificaitonrouter)
app.use("/Admin" , AdminRouter);

// Listen on port
const Port = process.env.Port || 3000;
server.listen(Port, () => {
  console.log("Server is running on port " + Port);
});

