
const{ AdminModel } = require( "../model/Admindb");
const bcrypt = require("bcrypt")

const CreateAdmin = async(req, res) =>{
  const { name, email, password , role } = req.body;
  console.log(req.body);

  try {
    const hashedPassword = await bcrypt.hash(password , 10)
console.log(hashedPassword)
    // Create new admin user
    const newAdmin = new AdminModel({
      name,
      email,
      password: hashedPassword,
      role:role,
    });

    // Save to database
    await newAdmin.save();
     
    res.status(201).json({ message: 'Admin user created successfully', admin: { name, email } });
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


module.exports = CreateAdmin