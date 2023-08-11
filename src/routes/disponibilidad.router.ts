
import { getAll, create, getOne, remove, addHour, updateHour, deleteHour, createNewAvailability, createCita, deleteAvailability, obtenerDisponibilidadProfesional, authUrl, getToken } from '../controllers/disponibilidad.controllers';
import {Router} from 'express'

export const routerDisponibilidad = Router();

routerDisponibilidad.route('/')
    .get(getAll) 
    .post(create) 

routerDisponibilidad.route('/authUrl')
    .get(authUrl)

routerDisponibilidad.route('/getToken')
    .get(getToken)

routerDisponibilidad.route('/:idprofesional').get(obtenerDisponibilidadProfesional)

routerDisponibilidad.route('/:id')
    .delete(remove)
    .get(getOne) 

routerDisponibilidad.route('/newAvailability/:id')
    .put(createNewAvailability)

routerDisponibilidad.route('/addNewHour/:id/:idDate')    
    .put(addHour) 

routerDisponibilidad.route('/updateHour/:id/:idDate')
    .put(updateHour)

routerDisponibilidad.route('/deleteHour/:id/:idDate')
    .put(deleteHour)

routerDisponibilidad.route('/createCita/:id/:idDate')
    .post(createCita)

routerDisponibilidad.route('/deleteAvailability/:id/:idDate')
    .delete(deleteAvailability)