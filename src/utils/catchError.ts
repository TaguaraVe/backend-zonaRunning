import { Request, Response, NextFunction } from 'express';

export function catchError(controller: (req: Request, res: Response, next: NextFunction) => Promise<void>) {
    return (req: Request, res: Response, next: NextFunction): Promise<void> => {
      return controller(req, res, next).catch((error) => {
        // Manejar el error aquí si es necesario
        next(error);
      });
    };
  }