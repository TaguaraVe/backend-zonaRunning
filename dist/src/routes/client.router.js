"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerClients = void 0;
const express_1 = __importDefault(require("express"));
const client_controller_1 = require("../controllers/client.controller");
exports.routerClients = express_1.default.Router();
exports.routerClients.get('/', client_controller_1.buscarClientes);
exports.routerClients.post('/', client_controller_1.crearCliente);
