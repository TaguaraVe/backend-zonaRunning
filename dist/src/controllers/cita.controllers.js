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
exports.crearCita = exports.buscarCitas = void 0;
const Cita_1 = __importDefault(require("../models/Cita"));
const buscarCitas = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const citas = yield Cita_1.default.find()
            .populate('client', 'edad peso estatura')
            .populate('service', 'title description')
            .populate('professional', 'especialidad rating');
        res.json(citas);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al buscar las citas', error });
    }
});
exports.buscarCitas = buscarCitas;
const crearCita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, hour, comments, client, service, professional } = req.body;
    try {
        const nuevaCita = yield Cita_1.default.create({ date, hour, comments, client, service, professional });
        res.json(nuevaCita);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear la cita', error });
    }
});
exports.crearCita = crearCita;
