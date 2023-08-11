"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerAvatar = void 0;
const avatar_controllers_1 = require("../controllers/avatar.controllers");
const express_1 = require("express");
const multer_1 = __importDefault(require("../utils/multer"));
exports.routerAvatar = (0, express_1.Router)();
exports.routerAvatar.route('/')
    .get(avatar_controllers_1.getAll)
    .post(multer_1.default.single('image'), avatar_controllers_1.create);
exports.routerAvatar.route('/:id')
    .delete(avatar_controllers_1.remove);
