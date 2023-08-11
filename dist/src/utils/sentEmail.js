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
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = (options) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: "miltonmercado92@gmail.com",
                pass: "wagffvxdhiafzdno"
            },
            tls: {
                rejectUnauthorized: false
            },
            secure: false
        });
        const mailOptions = Object.assign({ from: "miltonmercado92@gmail.com" }, options);
        transporter.sendMail(mailOptions, (error, info) => {
            console.log(error, info);
            if (error) {
                console.log(error);
                return reject({ message: "An error has occured" });
            }
            return resolve({ message: "Email sent successfully" });
        });
    });
});
exports.default = sendEmail;
