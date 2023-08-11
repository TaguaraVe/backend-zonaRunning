"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const clientSchema = new mongoose_1.Schema({
    edad: { type: String, required: true },
    peso: { type: Number, required: true },
    estatura: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true }
});
const ClientModel = (0, mongoose_1.model)('Client', clientSchema);
exports.default = ClientModel;
