
import { getAll, create, getOne, update, remove } from '../controllers/service.controllers';
import {Router} from 'express'

export const routerService = Router();

routerService.route('/')
    .get(getAll) //getting all services
    .post(create) //Creating a new service 

routerService.route('/:id')
    .get(getOne) //getting one service
    .put(update) //updating one service
    .delete(remove)// removing one service