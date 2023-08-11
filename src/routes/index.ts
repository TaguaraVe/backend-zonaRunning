import {Router} from 'express';
import { routerUser } from './user.router';
import { routerService } from './service.router';
import { routerProfessionals } from './professionals.router';
import { routerAvatar } from './avatar.router';
import { routerClients } from './client.router';
import { citaRouter } from './cita.router';
import { routerDisponibilidad } from './disponibilidad.router';

const globalRouter = Router() ;

//rutas

globalRouter.use('/professionals', routerProfessionals)
globalRouter.use('/clients', routerClients )
globalRouter.use("/users", routerUser)
globalRouter.use("/services", routerService)
globalRouter.use("/citas", citaRouter)
globalRouter.use('/avatars', routerAvatar)
globalRouter.use('/availability', routerDisponibilidad);


export default globalRouter;
