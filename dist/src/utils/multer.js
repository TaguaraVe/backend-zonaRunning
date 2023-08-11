"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const upload = (0, multer_1.default)({
    dest: path_1.default.join(__dirname, '..', 'public', 'uploads'),
    storage: multer_1.default.diskStorage({
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
        destination: path_1.default.join(__dirname, '..', 'public', 'uploads')
    })
});
exports.default = upload;
