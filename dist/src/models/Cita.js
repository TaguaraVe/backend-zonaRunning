"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const citaSchema = new mongoose_1.Schema({
    date: { type: Date, required: true },
    hour: { type: String, required: true },
    comments: { type: String },
    client: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Client', required: true },
    professional: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Profession', required: true }
});
const CitaModel = (0, mongoose_1.model)('Cita', citaSchema);
exports.default = CitaModel;
