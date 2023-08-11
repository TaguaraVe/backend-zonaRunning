"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const errorHandler = (error, _req, res, _next) => {
    if (error instanceof mongoose_1.default.Error.ValidationError) {
        // Manejar errores de validación de Mongoose
        const errObj = {};
        for (const key in error.errors) {
            if (error.errors.hasOwnProperty(key)) {
                errObj[key] = error.errors[key].message;
            }
        }
        return res.status(400).json(errObj);
    }
    if (error instanceof mongoose_1.default.Error.CastError) {
        // Manejar errores de conversión de tipos (CastError) en Mongoose
        return res.status(400).json({ message: 'Error de conversión de tipos' });
    }
    if (error.message.includes('duplicate key error')) {
        // Manejar errores de duplicación de índice en Mongoose
        return res.status(400).json({ message: 'Error de duplicación de índice' });
    }
    // Resto del código aquí
    return res.status(500).json({
        message: 'Error interno del servidor',
        error: error.message
    });
};
exports.default = errorHandler;
