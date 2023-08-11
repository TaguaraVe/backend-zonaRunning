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
exports.crearCliente = exports.buscarClientes = void 0;
const Client_1 = __importDefault(require("../models/Client"));
const buscarClientes = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientes = yield Client_1.default.find().populate('user');
        res.json(clientes);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al buscar los clientes', error });
    }
});
exports.buscarClientes = buscarClientes;
const crearCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { edad, peso, estatura, user } = req.body;
    try {
        const nuevoCliente = yield Client_1.default.create({ edad, peso, estatura, user });
        res.json(nuevoCliente);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear el cliente', error });
    }
});
exports.crearCliente = crearCliente;
