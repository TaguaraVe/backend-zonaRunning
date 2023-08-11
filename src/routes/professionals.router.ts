import {Router} from 'express'
import { buscarProfesiones, createProfesionales, deleteProfesionales, getAllProfesionales, getProfesionalesById, updateProfesionales} from '../controllers/professionals.controllers'

export const routerProfessionals =  Router()

routerProfessionals.get('/name/:profesion', buscarProfesiones)


routerProfessionals.route('/').get(getAllProfesionales)
.post(createProfesionales)

routerProfessionals.route('/:id').get(getProfesionalesById)
.patch(updateProfesionales).delete(deleteProfesionales)
