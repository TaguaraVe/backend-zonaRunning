"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.citaRouter = void 0;
const express_1 = __importDefault(require("express"));
const cita_controllers_1 = require("../controllers/cita.controllers");
exports.citaRouter = express_1.default.Router();
exports.citaRouter.get('/', cita_controllers_1.buscarCitas);
exports.citaRouter.post('/', cita_controllers_1.crearCita);
