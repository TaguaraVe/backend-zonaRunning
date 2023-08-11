"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromCloudinary = exports.uploadToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cloudinary = cloudinary_1.v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const uploadToCloudinary = (localFilePath, filename) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const folder = "zonarunning";
        const filePathCloudinary = folder + '/' + path_1.default.parse(filename).name;
        const result = yield cloudinary.uploader.upload(localFilePath, { "public_id": filePathCloudinary });
        return result;
    }
    catch (error) {
        console.log(error);
    }
    finally {
        fs_1.default.unlinkSync(localFilePath);
    }
});
exports.uploadToCloudinary = uploadToCloudinary;
const deleteFromCloudinary = (publicId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield cloudinary.uploader.destroy(publicId);
        return { message: "Avatar deleted" };
    }
    catch (error) {
        console.log(error);
        return { message: "delete from cloudinaty failed" };
    }
});
exports.deleteFromCloudinary = deleteFromCloudinary;
