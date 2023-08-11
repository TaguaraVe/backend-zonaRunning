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
exports.buscarProfesiones = exports.deleteProfesionales = exports.updateProfesionales = exports.createProfesionales = exports.getProfesionalesById = exports.getAllProfesionales = void 0;
const professionals_1 = __importDefault(require("../models/professionals"));
const getAllProfesionales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profesionales = yield professionals_1.default.find()
            .populate('user')
            .populate({
            path: 'user',
            populate: { path: 'avatar' }
        });
        res.json(profesionales);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Ha ocurrido un error al obtener los profesionales.' });
    }
});
exports.getAllProfesionales = getAllProfesionales;
const getProfesionalesById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const profesional = yield professionals_1.default.findById(id)
            .populate('user')
            .populate({
            path: 'user',
            populate: { path: 'avatar' }
        });
        if (!profesional) {
            res.status(404).json({ error: 'Profesional no encontrado.' });
        }
        else {
            res.json(profesional);
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error al obtener el profesional.' });
    }
});
exports.getProfesionalesById = getProfesionalesById;
const createProfesionales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nuevoProfesional = new professionals_1.default(req.body);
        console.log(nuevoProfesional);
        const profesionalGuardado = yield nuevoProfesional.save();
        res.status(201).json(profesionalGuardado);
    }
    catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error al crear el profesional.' });
    }
});
exports.createProfesionales = createProfesionales;
const updateProfesionales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const profesionalActualizado = yield professionals_1.default.findByIdAndUpdate(id, req.body, { new: true });
        if (!profesionalActualizado) {
            res.status(404).json({ error: 'Profesional no encontrado.' });
        }
        else {
            res.json(profesionalActualizado);
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error al actualizar el profesional.' });
    }
});
exports.updateProfesionales = updateProfesionales;
const deleteProfesionales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const profesionalEliminado = yield professionals_1.default.findByIdAndDelete(id);
        if (!profesionalEliminado) {
            res.status(404).json({ error: 'Profesional no encontrado.' });
        }
        else {
            res.json({ message: 'Profesional eliminado correctamente.' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error al eliminar el profesional.' });
    }
});
exports.deleteProfesionales = deleteProfesionales;
const buscarProfesiones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { profesion } = req.params;
    try {
        if (profesion) {
            const especialidades = yield professionals_1.default.find({ especialidad: profesion })
                .populate('user')
                .populate({
                path: 'user',
                populate: { path: 'avatar' }
            });
            res.json(especialidades);
        }
        else {
            const profesiones = yield professionals_1.default.find();
            res.json(profesiones);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al buscar las profesiones', error });
    }
});
exports.buscarProfesiones = buscarProfesiones;
