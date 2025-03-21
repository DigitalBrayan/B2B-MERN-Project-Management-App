import { NextFunction, Request, Response } from "express";

// Definimos el tipo para los controladores asincrónicos
type AsyncControllersType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

// El manejador asíncrono que envolvía al controlador para capturar errores
export const asyncHandler =
  (controller: AsyncControllersType): AsyncControllersType =>
  async (req, res, next) => {
    try {
      // Llamamos al controlador asincrónico
      await controller(req, res, next);
    } catch (error) {
      // Si ocurre un error, lo pasamos al siguiente middleware
      next(error);
    }
  };
