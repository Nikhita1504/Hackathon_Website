const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
    cloud_name: process.env.ClOUDINARY_CLOUD_NAME,
    api_key: process.env.ClOUDINARY_CLOUD_API_KEY,
    api_secret: process.env.ClOUDINARY_CLOUD_API_SECRET_KEY,
});

const fileuploadCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null;
        }
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });
        console.log("File uploaded to Cloudinary:", response.url);
        return response;
    } catch (error) {
        // Remove corrupted file from the server if Cloudinary upload fails
        fs.unlinkSync(localFilePath);
        console.log(error);
    }
};

module.exports = { fileuploadCloudinary };
