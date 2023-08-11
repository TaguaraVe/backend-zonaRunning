import { Request, Response, NextFunction } from 'express';
import mongoose, { Error } from 'mongoose';

const errorHandler = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof mongoose.Error.ValidationError) {
    // Manejar errores de validación de Mongoose
    const errObj: Record<string, string> = {};
    for (const key in error.errors) {
      if (error.errors.hasOwnProperty(key)) {
        errObj[key] = error.errors[key].message;
      }
    }
    return res.status(400).json(errObj);
  }

  if (error instanceof mongoose.Error.CastError) {
    // Manejar errores de conversión de tipos (CastError) en Mongoose
    return res.status(400).json({ message: 'Error de conversión de tipos' });
  }

  if (error.message.includes('duplicate key error')) {
    // Manejar errores de duplicación de índice en Mongoose
    return res.status(400).json({ message: 'Error de duplicación de índice' });
  }

  // Resto del código aquí

  return res.status(500).json({
    message: 'Error interno del servidor',
    error: error.message
  });
};

export default errorHandler;
