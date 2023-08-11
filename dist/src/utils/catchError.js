"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchError = void 0;
function catchError(controller) {
    return (req, res, next) => {
        return controller(req, res, next).catch((error) => {
            // Manejar el error aquí si es necesario
            next(error);
        });
    };
}
exports.catchError = catchError;
