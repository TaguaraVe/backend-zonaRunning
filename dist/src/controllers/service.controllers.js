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
exports.update = exports.remove = exports.getOne = exports.create = exports.getAll = void 0;
const catchError_1 = require("../utils/catchError");
const Service_1 = __importDefault(require("../models/Service"));
const mongoose_1 = __importDefault(require("mongoose"));
//Get all services -------- public endPoint
exports.getAll = (0, catchError_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.query;
    let query = {};
    if (title) {
        query = {
            title: {
                $eq: title
            }
        };
    }
    const services = yield Service_1.default.find(query);
    res.json(services);
}));
//Post one services ---------- public endPoint
exports.create = (0, catchError_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const service = new Service_1.default(body);
    yield service.save();
    if (!service) {
        res.sendStatus(404);
    }
    else {
        res.sendStatus(201);
    }
}));
//Get one --------/services/:id ------- public EndPoint
exports.getOne = (0, catchError_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.isValidObjectId(id)) {
        res.status(404).json({ message: "ID invalid" });
    }
    else {
        const service = yield Service_1.default.findById({ _id: id });
        res.json(service);
    }
}));
//Remove One --> /services ----------- public endPont
exports.remove = (0, catchError_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.isValidObjectId(id)) {
        res.status(404).json({ message: "ID invalid" });
    }
    else {
        const deleteService = yield Service_1.default.deleteOne({ _id: id });
        if (deleteService.deletedCount == 0) {
            res.sendStatus(404);
        }
        else {
            res.sendStatus(204);
        }
    }
}));
//Put One --> /services/:id ------- public EndPoint
exports.update = (0, catchError_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const body = req.body;
    if (!mongoose_1.default.isValidObjectId(id)) {
        res.status(404).json({ message: "ID invalid" });
    }
    else {
        if (Object.keys(body).length == 0) {
            res.status(404).json({ message: "Empty body" });
        }
        else {
            const service = yield Service_1.default.findByIdAndUpdate({ _id: id }, body, { new: true });
            if (!service) {
                res.status(404).json({ message: "Service not found" });
            }
            else {
                res.json(service);
            }
        }
    }
}));
