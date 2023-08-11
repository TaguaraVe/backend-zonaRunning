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
exports.setAvatar = exports.updatePassword = exports.resetPassword = exports.logged = exports.verifyCode = exports.login = exports.update = exports.remove = exports.getOne = exports.create = exports.getAll = void 0;
const catchError_1 = require("../utils/catchError");
const sentEmail_1 = __importDefault(require("../utils/sentEmail"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const randomCode_1 = __importDefault(require("../utils/randomCode"));
const User_1 = __importDefault(require("../models/User"));
const mongoose_1 = __importDefault(require("mongoose"));
const EmailCode_1 = __importDefault(require("../models/EmailCode"));
//GET all-> /users ------------ public EndPoint 
exports.getAll = (0, catchError_1.catchError)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.find().populate('avatar');
    res.json(user);
}));
//Post -> /users ------------ public EndPoint 
exports.create = (0, catchError_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { First_name, Last_name, Email, Password, Profession, role } = req.body;
    //const frontBaseUrl:string = req.body.frontBaseUrl;
    const body = {
        First_name,
        Last_name,
        Email,
        Password: yield bcrypt_1.default.hash(Password, 10),
        Profession,
        role
    };
    // const frontBaseUrl: string = req.body.frontBaseUrl;
    const user = new User_1.default(body);
    yield user.save();
    if (!user) {
        res.sendStatus(404);
    }
    else {
        // const code: string = randomCode();
        // const url: string = `${frontBaseUrl}/very_email/${code}`;
        // await sendEmail({
        //     to: Email,
        //     subject: 'Verificacion de cuenta',
        //     html: `
        //         <h2>User Creating</h2>
        //         <a href='${url}'>Click me!</a> 
        //     `
        // })
        // const bodyCode: object = { code, userId: user._id }
        // const email = new EmailCode(bodyCode)
        // await email.save();
        res.status(201).json(user);
    }
}));
//GET One -> /users/:id ------------ public EndPoint 
exports.getOne = (0, catchError_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.isValidObjectId(id)) {
        res.status(404).json({ message: 'ID invalid' });
    }
    else {
        const user = yield User_1.default.findById(id).populate('avatar');
        res.json(user);
    }
}));
//Remove One -> /users/:id ------------ public EndPoint 
exports.remove = (0, catchError_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.isValidObjectId(id)) {
        res.status(404).json({ message: "ID invalid" });
    }
    else {
        const deleteUser = yield User_1.default.deleteOne({ _id: id });
        if (deleteUser.deletedCount == 0) {
            res.sendStatus(404);
        }
        else {
            res.sendStatus(204);
        }
    }
}));
//put One -> /users/:id ------------ public EndPoint 
exports.update = (0, catchError_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const body = req.body;
    if (!mongoose_1.default.isValidObjectId(id)) {
        res.status(404).json({ message: "ID invalid" });
    }
    else {
        if (Object.keys(body).length == 0) {
            res.status(404).json({ message: "Empty body" });
        }
        else {
            const user = yield User_1.default.findByIdAndUpdate({ _id: id }, body, { new: true });
            if (!user) {
                res.status(404).json({ message: "User not found" });
            }
            else {
                res.json(user);
            }
        }
    }
}));
//login post -> /users/login
exports.login = (0, catchError_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_1.default.findOne({ Email: email });
    if (!user) {
        res.status(401).json({ error: "Envalid Credentials" });
    }
    else {
        const isValidPassword = yield bcrypt_1.default.compare(password, user.Password);
        if (isValidPassword) {
            const token = jsonwebtoken_1.default.sign({ user }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
            res.status(200).json({ user, token });
        }
        else {
            res.status(401).json({ error: "Envalid Credentials" });
        }
    }
}));
//GET -> /users/verify/:code --- public endpoint
exports.verifyCode = (0, catchError_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const codeUser = yield EmailCode_1.default.findOne({ code });
    if (!codeUser) {
        res.sendStatus(401);
    }
    else {
        const body = { habilitado: true };
        const userUpdate = yield User_1.default.findByIdAndUpdate({ _id: codeUser.userId }, body, { new: true });
        yield codeUser.deleteOne();
        res.json(userUpdate);
    }
}));
exports.logged = (0, catchError_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        const { _id } = req.user;
        const user = yield User_1.default.findById({ _id });
        res.send(user);
    }
    else {
        res.sendStatus(204);
    }
}));
// working with the reset password
//reset_password ---------------- public EndPoint
exports.resetPassword = (0, catchError_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email: userEmail, frontBaseUrl } = req.body;
    const user = yield User_1.default.findOne({ Email: userEmail });
    if (user) {
        const code = `password ${(0, randomCode_1.default)()}`;
        const url = `${frontBaseUrl}/reset_password/${code}`;
        yield (0, sentEmail_1.default)({
            to: userEmail,
            subject: 'solicitud de cambio de contraseña',
            html: `
                <h2>Cambiar contraseña</h2>
                <a href='${url}'>Click me!</a> 
            `
        });
        const bodyCode = { code, userId: user._id };
        const email = new EmailCode_1.default(bodyCode);
        yield email.save();
        res.json(user);
    }
    else {
        res.sendStatus(401);
    }
}));
//Get /users/reset_password/:code ---- public enpoint
exports.updatePassword = (0, catchError_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const { password } = req.body;
    const userCode = yield EmailCode_1.default.findOne({ code });
    if (userCode && password) {
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        const body = { Password: hashPassword };
        const user = yield User_1.default.findByIdAndUpdate({ _id: userCode.userId }, body, { new: true });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        else {
            yield userCode.deleteOne();
            res.json(user);
        }
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
}));
//Set avatar
exports.setAvatar = (0, catchError_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { avatarId } = req.body;
    const avatar = yield User_1.default.findByIdAndUpdate({ _id: id }, { avatar: avatarId }, { new: true });
    if (!avatar)
        res.status(404).json({ message: "User not found" });
    if (avatar)
        res.json(avatar);
}));
