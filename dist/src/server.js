"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const connection_1 = require("./utils/connection");
const PORT = process.env.PORT || 3000;
const main = () => {
    (0, connection_1.connectDB)();
    app_1.default.listen(PORT);
    console.log(`Server running on port ${PORT}`);
};
main();
