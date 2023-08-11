import express from 'express';
import { buscarCitas, crearCita } from '../controllers/cita.controllers';


export const citaRouter = express.Router();


citaRouter.get('/', buscarCitas);


citaRouter.post('/', crearCita);

