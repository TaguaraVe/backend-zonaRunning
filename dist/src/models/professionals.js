"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const professionSchema = new mongoose_1.Schema({
    especialidad: { type: String, required: true },
    rating: { type: Number, required: true },
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    source: { type: String, required: true },
    duracion: { type: String, required: true },
    disponibilidad: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Disponibilidad' }
});
const ProfessionModel = (0, mongoose_1.model)('Profession', professionSchema);
exports.default = ProfessionModel;
