"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerUser = void 0;
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user.controllers");
const verifyJWT_1 = __importDefault(require("../utils/verifyJWT"));
exports.routerUser = (0, express_1.Router)();
exports.routerUser.route('/')
    .get(user_controllers_1.getAll) //Getting all users
    .post(user_controllers_1.create); // Creating a new user 
exports.routerUser.route('/login') //Post --->> //users/login ----------> public endpoint
    .post(user_controllers_1.login);
exports.routerUser.route('/me') //Get --> users/me private endPoint
    .get(verifyJWT_1.default, user_controllers_1.logged);
exports.routerUser.route('/reset_password') //Post --> /users/reset_password ------------ public EndPont
    .post(user_controllers_1.resetPassword);
exports.routerUser.route('/:id')
    .get(verifyJWT_1.default, user_controllers_1.getOne) //getting one user
    .put(verifyJWT_1.default, user_controllers_1.update) //updating one user
    .delete(user_controllers_1.remove); //removing one user 
exports.routerUser.route('/verify/:code')
    .get(user_controllers_1.verifyCode);
exports.routerUser.route('/reset_password/:code') // Post -----> /users/reset_password/:code -----> public endpoint
    .post(user_controllers_1.updatePassword);
exports.routerUser.route('/avatar/:id')
    .post(user_controllers_1.setAvatar); //update avatar
