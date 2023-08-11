import { Request, Response } from 'express';
import ProfessionModel from '../models/professionals';


export const getAllProfesionales = async (req: Request, res: Response): Promise<void> => {
  try {
    const profesionales = await ProfessionModel.find()
                .populate('user')
                .populate({
                    path: 'user',
                    populate: {path: 'avatar'}
                });

    res.json(profesionales);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: 'Ha ocurrido un error al obtener los profesionales.' });
  }
};


export const getProfesionalesById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  
  try {
    const profesional = await ProfessionModel.findById(id)
            .populate('user')
            .populate({
                path: 'user',
                populate: {path: 'avatar'}
            });
    if (!profesional) {
      res.status(404).json({ error: 'Profesional no encontrado.' });
    } else {
      res.json(profesional);
    }
  } catch (error) {
    res.status(500).json({ error: 'Ha ocurrido un error al obtener el profesional.' });
  }
};


export const createProfesionales = async (req: Request, res: Response): Promise<void> => {
  try {
    const nuevoProfesional = new ProfessionModel(req.body);
    console.log(nuevoProfesional);
    const profesionalGuardado = await nuevoProfesional.save();
    res.status(201).json(profesionalGuardado);
  } catch (error) {
    res.status(500).json({ error: 'Ha ocurrido un error al crear el profesional.' });
  }
};


export const updateProfesionales = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const profesionalActualizado = await ProfessionModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!profesionalActualizado) {
      res.status(404).json({ error: 'Profesional no encontrado.' });
    } else {
      res.json(profesionalActualizado);
    }
  } catch (error) {
    res.status(500).json({ error: 'Ha ocurrido un error al actualizar el profesional.' });
  }
};


export const deleteProfesionales = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const profesionalEliminado = await ProfessionModel.findByIdAndDelete(id);
    if (!profesionalEliminado) {
      res.status(404).json({ error: 'Profesional no encontrado.' });
    } else {
      res.json({ message: 'Profesional eliminado correctamente.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Ha ocurrido un error al eliminar el profesional.' });
  }
};

export const buscarProfesiones = async (req: Request, res: Response): Promise<void> => {
  const { profesion } = req.params;
  
  try {
    if (profesion) {
      const especialidades = await ProfessionModel.find({ especialidad: profesion })
                .populate('user')
                .populate({
                    path: 'user',
                    populate: {path: 'avatar'}
                });
      res.json(especialidades);
    } else {
      const profesiones = await ProfessionModel.find();
      res.json(profesiones);
    }
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: 'Error al buscar las profesiones', error });
  }
};