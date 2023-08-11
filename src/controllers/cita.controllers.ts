import { Request, Response } from 'express';
import CitaModel from '../models/Cita';



export const buscarCitas = async (_req: Request, res: Response): Promise<void> => {
  try {
    const citas = await CitaModel.find()
      .populate('client', 'edad peso estatura')
      .populate('service', 'title description')
      .populate('professional', 'especialidad rating');
    res.json(citas);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar las citas', error });
  }
};


export const crearCita = async (req: Request, res: Response): Promise<void> => {
  const { date, hour, comments, client, service, professional } = req.body;

  try {
    const nuevaCita = await CitaModel.create({ date, hour, comments, client, service, professional });
    res.json(nuevaCita);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la cita', error });
  }
};
