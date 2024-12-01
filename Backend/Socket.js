const { Server } = require("socket.io");
const { UserModel, NotificationModel } = require("./model/db");

function hello(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  let onlineUser = [];

  const addNewUser = (email, socketID) => {
    const user = onlineUser.find((user) => {
      return user.useremail == email;
    });
    console.log("between adding new user", user);
    if (user) {
      user.socketID = socketID;
    } else {
      onlineUser.push({ useremail: email, socketID });
    }

    console.log("after adding user", onlineUser);
  };

  const getUser = (email) => {
    console.log("enter getUser");

    console.log(email);
    const user = onlineUser.find((User) => {
      return User.useremail == email;
    });

    console.log(user);
    console.log(user?.socketID);
    return user?.socketID;
  };

  const removeUser = (socketID) => {
    onlineUser = onlineUser.filter((user) => {
      return user.socketID != socketID;
    });
    console.log("after removing ", onlineUser);
  };

  io.on("connection", (socket) => {
    console.log("on connection", onlineUser);

    socket.on("newUser", (email) => {
      console.log("new User", email);
      addNewUser(email, socket.id);
    });

    socket.on(
      "SendNotification",
      async (senderemail, recieveremail, text, details) => {
        console.log("reciever", recieveremail);
        console.log("sender", senderemail);
        console.log("details", details);
        const sender = await UserModel.findOne({ email: senderemail });
        const reciever = await UserModel.findOne({ email: recieveremail });


        const Notification = new NotificationModel({
          SenderUser: sender._id,
          RecieverUser: reciever._id,
          message: text,
          Details: details,
        });
        console.log(Notification);

        await Notification.save();
        console.log(onlineUser);

        const recieverID = getUser(recieveremail);
        console.log("recieverId", recieverID);
        const RecieverNotifications = await NotificationModel.find({
          RecieverUser: reciever._id,
        });
        console.log(RecieverNotifications);

        if (recieverID) {
          socket.to(recieverID).emit("getNotification", {
            RecieverNotifications,
          });
        } else {
          console.log("user is not online");
        }
      }
    );

    socket.on("DeleteNotification", (recieveremail) => {
      socket.emit("DeleteNotification");
      console.log("emitted");
    });

    socket.on("disconnect", () => {
      console.log("disconnect user");
      removeUser(socket.id);
    });socket.on("deleteTeam", async (teamId) => {
      try {
        // Perform the team deletion logic
        await TeamModel.findByIdAndDelete(teamId);
        // Emit 'teamDeleted' to all connected clients
        io.emit("teamDeleted", teamId);  // Emit to all connected clients
      } catch (error) {
        console.error("Error deleting team:", error);
        socket.emit("errorDeletingTeam", error.message); // Emit error back to the requester
      }
    });

    socket.on("deleteTeam", async (teamId) => {
      try {
        // Perform the team deletion logic
        await TeamModel.findByIdAndDelete(teamId);
        // Emit 'teamDeleted' to all connected clients
        io.emit("teamDeleted", teamId);  // Emit to all connected clients
      } catch (error) {
        console.error("Error deleting team:", error);
        socket.emit("errorDeletingTeam", error.message); // Emit error back to the requester
      }
    });
  });

  
}


module.exports = { hello };
