// Importa la interfaz ErrorRequestHandler para definir el tipo correcto del middleware de manejo de errores
import { ErrorRequestHandler } from "express-serve-static-core";
// Importa los códigos de estado HTTP desde la configuración
import { HTTPSTATUS } from "../config/http.config";
// Importa la clase AppError que se utiliza para manejar errores personalizados
import { AppError } from "../utils/appError";

// Este es el middleware que maneja los errores que se generen en el servidor
export const errorHandler: ErrorRequestHandler = (
  error,       // El error que ocurrió
  req,         // El objeto de la solicitud (request)
  res,         // El objeto de la respuesta (response)
  next         // El siguiente middleware (no se usa en este caso)
): any => {
  
  // Aquí se agrega un log detallado en la consola para registrar el error y la ruta donde ocurrió
  console.error(`Error Ocurred on PATH: ${req.path}`, error);
  
  // Si el error es una instancia de SyntaxError (por ejemplo, un JSON mal formado en el cuerpo de la solicitud)
  if (error instanceof SyntaxError) {
    // Responde con un mensaje de error y un código de estado 400 (Bad Request)
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: "Invalid JSON format. Por favor revisa tu petición" // Informa al usuario que la solicitud tiene un formato incorrecto
    });
  }

  // Si el error es una instancia de la clase AppError, maneja el error con sus propiedades personalizadas
  if (error instanceof AppError) {
    // Responde utilizando el código de estado y mensaje definidos en la instancia de AppError
    return res.status(error.statusCode).json({
      message: error.message,        // El mensaje de error personalizado
      errorCode: error.errorCode     // El código de error personalizado asociado al error
    });
  }

  // Si el error no es ni un SyntaxError ni un AppError, responde con un error 500 (Internal Server Error)
  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: "Internal server Error",   // Mensaje general de error
    error: error?.message || "Unknown error occurred",  // Si existe un mensaje de error, lo muestra, si no, muestra un mensaje genérico
  });
};
