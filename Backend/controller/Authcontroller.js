const { UserModel } = require("../model/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({
          message: "user is already exist, you can login",
          succes: false,
        });
    }
    const UserModell = new UserModel({
      name,
      email,
      password,
    });
    UserModell.password = await bcrypt.hash(password, 10);
    const { _id, isAdmin } = await UserModell.save();
    const token = jwt.sign(
      {user:{
        email,
        isAdmin,
        UserId: _id,
      }
       
      },
      process.env.SecretKey,
     
    );
    res.status(201).json({ message: "signup successfully", success: true ,jwt_token: token});
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", err, success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({
          message: "user doesnot exist , you can signup",
          succes: false,
        });
    }
    const isMatch = await bcrypt.compare(password, user.password);
   
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }
    const token = jwt.sign(
      {user},
      // { email, name:user.name, UserId: user._id, isAdmin: user.isAdmin },
      process.env.SecretKey,
    
    );
    
    res
      .status(200)
      .json({ message: "Login successful", success: true, jwt_token: token });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Internal server error",
        error: err.message,
        success: false,
      });
  }
};

module.exports = { signup, login };
