const express = require("express");
const multer = require("multer");
const path = require("path");
const { UserModel } = require("../model/db");
const { fileuploadCloudinary } = require("../cloudinary"); 
const fs = require("fs"); 

const ImageUpload = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/Images"); 
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


ImageUpload.post("/:email", upload.single("file"), async (req, res) => {
    try {
        const { email } = req.params;


        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        const localFilePath = req.file.path;


        const cloudinaryResponse = await fileuploadCloudinary(localFilePath);

        

            user.profilePicture = cloudinaryResponse.url;
            await user.save();


            fs.unlinkSync(localFilePath);

            res.status(200).json({ message: "Profile picture updated successfully!", profilePicture: user.profilePicture });
       
    } catch (error) {
        console.error("Error uploading profile picture:", error);
        res.status(500).json({ message: "Error uploading profile picture" });
    }
});

module.exports = ImageUpload;
