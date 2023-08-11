"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerDisponibilidad = void 0;
const disponibilidad_controllers_1 = require("../controllers/disponibilidad.controllers");
const express_1 = require("express");
exports.routerDisponibilidad = (0, express_1.Router)();
exports.routerDisponibilidad.route('/')
    .get(disponibilidad_controllers_1.getAll)
    .post(disponibilidad_controllers_1.create);
exports.routerDisponibilidad.route('/authUrl')
    .get(disponibilidad_controllers_1.authUrl);
exports.routerDisponibilidad.route('/getToken')
    .get(disponibilidad_controllers_1.getToken);
exports.routerDisponibilidad.route('/:idprofesional').get(disponibilidad_controllers_1.obtenerDisponibilidadProfesional);
exports.routerDisponibilidad.route('/:id')
    .delete(disponibilidad_controllers_1.remove)
    .get(disponibilidad_controllers_1.getOne);
exports.routerDisponibilidad.route('/newAvailability/:id')
    .put(disponibilidad_controllers_1.createNewAvailability);
exports.routerDisponibilidad.route('/addNewHour/:id/:idDate')
    .put(disponibilidad_controllers_1.addHour);
exports.routerDisponibilidad.route('/updateHour/:id/:idDate')
    .put(disponibilidad_controllers_1.updateHour);
exports.routerDisponibilidad.route('/deleteHour/:id/:idDate')
    .put(disponibilidad_controllers_1.deleteHour);
exports.routerDisponibilidad.route('/createCita/:id/:idDate')
    .post(disponibilidad_controllers_1.createCita);
exports.routerDisponibilidad.route('/deleteAvailability/:id/:idDate')
    .delete(disponibilidad_controllers_1.deleteAvailability);
