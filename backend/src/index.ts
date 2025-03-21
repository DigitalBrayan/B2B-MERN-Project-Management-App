// Importa las variables de entorno de 'process' y carga el archivo .env
import { env } from "process";
import "dotenv/config";  // Carga las variables de entorno desde un archivo .env

// Importa las dependencias necesarias para configurar y manejar el servidor
import express, { NextFunction, Request, Response } from "express";
import { config } from "./config/app.config"; // Importa la configuración personalizada (como la URI de la base de datos, claves secretas, etc.)
import session from "cookie-session"; // Importa el middleware para manejar sesiones en cookies
import cors from "cors"; // Importa el middleware para habilitar CORS (Cross-Origin Resource Sharing)
import { connect } from "http2"; // Se importa, pero no parece utilizarse en este fragmento de código (probablemente es innecesario)
import connectDatabase from "./config/bd.config"; // Importa la función que conecta a la base de datos
import { errorHandler } from "./middlewares/errorHandler.middleware"; // Importa el middleware para el manejo de errores
import { HTTPSTATUS } from "./config/http.config";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import { BadRequestExeption } from "./utils/appError";
import { ErrorCodeEnum } from "./enums/error-code.enums";

const app = express(); // Crea la instancia de la aplicación Express
const BASE_PATH = config.BASE_PATH; // Usa la ruta base configurada en app.config (para poder definir rutas base en el futuro)

// Middleware para parsear JSON en las solicitudes entrantes
app.use(express.json());

// Middleware para parsear datos de formularios URL-encoded (como los que se envían en formularios HTML)
app.use(express.urlencoded({ extended: true }));

// Middleware para manejar sesiones utilizando cookies
app.use(
  session({
    name: "session", // Nombre de la cookie de la sesión
    keys: [config.SESSION_SECRET], // Claves secretas para firmar la sesión (probablemente definida en el archivo .env)
    maxAge: 24 * 60 * 60 * 1000, // Duración de la sesión en milisegundos (24 horas)
    secure: config.NODE_ENV === "production", // Solo usar cookies seguras en el entorno de producción (requiere HTTPS)
    httpOnly: true, // La cookie solo puede ser accedida por el servidor, no por JavaScript en el cliente
    sameSite: "lax", // Política de "same-site" para proteger contra algunos ataques CSRF (Cross-Site Request Forgery)
  })
);

// Middleware para habilitar CORS, permitiendo que el frontend acceda al backend
app.use(
  cors({
    origin: config.FRONTEND_ORIGIN, // Define el origen permitido (especificado en la configuración, por ejemplo, localhost)
    credentials: true, // Permite enviar cookies con las solicitudes CORS
  })
);

// Define una ruta GET para la raíz del servidor ("/")
// app.get(`/`, async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // Aquí puedes agregar alguna lógica asincrónica si es necesario
//     res.status(HTTPSTATUS.OK).json({
//       message: "holaaa", // Responde con un mensaje JSON de bienvenida
//     });
//   } catch (error) {
//     // Si ocurre un error, captura y maneja el error aquí
//     next(error); // Pasa el error al middleware de manejo de errores
//   }
// });
//ya como se maneja manejador de rutas asíncronas
//entonces el try, el catch, el async, se maneja desde el midleware

app.get(`/`, 
  asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
// throw new Error("Test error");
throw new BadRequestExeption("Bad Request", ErrorCodeEnum.AUTH_TOKEN_INVALID);
   return res.status(HTTPSTATUS.OK).json({
      message: "holaaa", 
    });

}))

// Usa el middleware de manejo de errores. Este middleware debe estar después de todas las rutas y antes del manejador final.
app.use(errorHandler);

// Inicia el servidor en el puerto configurado en app.config
app.listen(config.PORT, async () => {
  console.log(`server corriendo en ${config.PORT} en ${config.NODE_ENV}`); // Muestra en la consola el puerto y el entorno de ejecución
  await connectDatabase(); // Llama a la función para conectar la base de datos cuando el servidor esté listo
});
