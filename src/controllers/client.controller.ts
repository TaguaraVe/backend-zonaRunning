import { Request, Response } from 'express';
import ClientModel from '../models/Client';



export const buscarClientes = async (_req: Request, res: Response): Promise<void> => {
  try {
    const clientes = await ClientModel.find().populate('user');
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar los clientes', error });
  }
};


export const crearCliente = async (req: Request, res: Response): Promise<void> => {
  const { edad, peso, estatura, user } = req.body;

  try {
    const nuevoCliente = await ClientModel.create({ edad, peso, estatura, user });
    res.json(nuevoCliente);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el cliente', error });
  }
};