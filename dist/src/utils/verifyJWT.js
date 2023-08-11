"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (typeof authHeader == 'string') {
        if (!authHeader.startsWith('Bearer ')) {
            res.sendStatus(401);
        }
        else {
            let token = authHeader.split(' ')[1];
            const tokenSecret = process.env.TOKEN_SECRET;
            jsonwebtoken_1.default.verify(token, tokenSecret, (err, decoded) => {
                if (err) {
                    res.sendStatus(403);
                }
                else {
                    if (typeof decoded !== 'string' && decoded != undefined) {
                        req.user = decoded.user;
                    }
                    next();
                }
            });
        }
    }
    else if (!authHeader) {
        res.sendStatus(401);
    }
};
exports.default = verifyJWT;
