"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const professionSchema = new mongoose_1.Schema({
    disponibilidad: [
        {
            dia: { type: String },
            horas: { type: [String] }
        }
    ],
    profesional: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Profession', required: true }
});
const ProfessionModel = (0, mongoose_1.model)('Disponibilidad', professionSchema);
exports.default = ProfessionModel;
