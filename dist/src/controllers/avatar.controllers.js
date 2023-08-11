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
exports.remove = exports.create = exports.getAll = void 0;
const Avatar_1 = __importDefault(require("../models/Avatar"));
const catchError_1 = require("../utils/catchError");
const cloudinary_1 = require("../utils/cloudinary");
exports.getAll = (0, catchError_1.catchError)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const avatar = yield Avatar_1.default.find();
    res.json(avatar);
}));
exports.create = (0, catchError_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        if (req.file.filename) {
            const { path, filename } = req.file;
            const images = yield (0, cloudinary_1.uploadToCloudinary)(path, filename);
            if (images) {
                const { url, public_id } = images;
                const body = { url, filename: public_id };
                const image = new Avatar_1.default(body);
                yield image.save();
                res.status(201).json(image);
            }
        }
        else {
            res.status(404);
        }
    }
}));
exports.remove = (0, catchError_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const image = yield Avatar_1.default.findById({ _id: id });
    if (image) {
        yield (0, cloudinary_1.deleteFromCloudinary)(image.filename);
        yield image.deleteOne();
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));
