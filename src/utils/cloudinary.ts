import {v2, UploadApiResponse} from 'cloudinary';
import fs from 'fs';
import path from 'path';
import dotenv from "dotenv"

dotenv.config()

const cloudinary = v2

cloudinary.config({
    cloud_name: <string>process.env.CLOUDINARY_CLOUD_NAME,
    api_key:<string>process.env.CLOUDINARY_API_KEY,
    api_secret:<string>process.env.CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = async (localFilePath:string, filename:string):Promise<UploadApiResponse | void> => {
    try {
        const folder = "zonarunning";
        const filePathCloudinary = folder + '/' + path.parse(filename).name;

        const result = await cloudinary.uploader.upload(
            localFilePath,
            {"public_id":filePathCloudinary}
        )

        return result 
    } catch (error) {
        console.log(error);
    
    }finally{
        fs.unlinkSync(localFilePath)
    }
}

export const deleteFromCloudinary = async (publicId:string):Promise<{message: string}> => {

    try {
        await cloudinary.uploader.destroy(publicId)

        return {message: "Avatar deleted"}
    } catch (error) {
        console.log(error)
        return {message: "delete from cloudinaty failed"}
    }

}