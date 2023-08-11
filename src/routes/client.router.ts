import express from 'express';
import { buscarClientes, crearCliente } from '../controllers/client.controller';

export const routerClients = express.Router();


routerClients.get('/', buscarClientes);
routerClients.post('/', crearCliente);

