"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerService = void 0;
const service_controllers_1 = require("../controllers/service.controllers");
const express_1 = require("express");
exports.routerService = (0, express_1.Router)();
exports.routerService.route('/')
    .get(service_controllers_1.getAll) //getting all services
    .post(service_controllers_1.create); //Creating a new service 
exports.routerService.route('/:id')
    .get(service_controllers_1.getOne) //getting one service
    .put(service_controllers_1.update) //updating one service
    .delete(service_controllers_1.remove); // removing one service
