"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerProfessionals = void 0;
const express_1 = require("express");
const professionals_controllers_1 = require("../controllers/professionals.controllers");
exports.routerProfessionals = (0, express_1.Router)();
exports.routerProfessionals.get('/name/:profesion', professionals_controllers_1.buscarProfesiones);
exports.routerProfessionals.route('/').get(professionals_controllers_1.getAllProfesionales)
    .post(professionals_controllers_1.createProfesionales);
exports.routerProfessionals.route('/:id').get(professionals_controllers_1.getProfesionalesById)
    .patch(professionals_controllers_1.updateProfesionales).delete(professionals_controllers_1.deleteProfesionales);
