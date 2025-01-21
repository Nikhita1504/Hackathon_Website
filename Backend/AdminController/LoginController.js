const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AdminModel } = require("../model/Admindb");
require("dotenv").config();

const AdminLogin = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
 
    const Admin = await AdminModel.findOne({ email });
    if (!Admin) {
      return res.status(401).json({
        message: "Admin doesnot exist ",
        succes: false,
      });
    }
    const isMatch = await bcrypt.compare(password, Admin.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }
    const token = jwt.sign({ Admin }, process.env.SecretKey);

    res
      .status(200)
      .json({ message: "Login successful", success: true, jwt_token: token  , Admin:Admin});
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
      success: false,
    });
  }
};
module.exports = { AdminLogin };
