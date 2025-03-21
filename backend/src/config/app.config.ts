import { getEnv } from "../utils/get-env";

//va seleccionar los env 
// Llamamos a la función getEnv para obtener las variables de entorno y configurarlas en la aplicación
const appConfig = () => ({
    // Obtiene la variable NODE_ENV. Si no existe, por defecto será 'develoment'.
    NODE_ENV: getEnv("NODE_ENV", "develoment"),

    // Obtiene la variable PORT. Si no está definida, se usará '5000' como valor por defecto.
    PORT: getEnv("PORT", "5000"),

    // Obtiene la ruta base para las APIs. Si no está definida, usará '/api'.
    BASE_PATH: getEnv("BASE_PATH", "/api"),

    // Obtiene la URI de conexión de MongoDB. Si no está definida, no se usa un valor por defecto.
    MONGO_URI: getEnv("MONGO_URI", ""),

    // Obtiene la clave secreta de la sesión.
    SESSION_SECRET: getEnv("SESSION_SECRET"),

    // Obtiene el tiempo de expiración de la sesión.
    SESSION_EXPIRES_IN: getEnv("SESSION_EXPIRES_IN"),

    // Obtiene las credenciales de Google. Si no están definidas, lanzará un error.
    // GOOGLE_CLIENT_ID: getEnv("GOOGLE_CLIENT_ID"),
    // GOOGLE_CLIENT_SECRET: getEnv("GOOGLE_CLIENT_SECRET"),
    // GOOGLE_CLIENT_URL: getEnv("GOOGLE_CLIENT_URL"),

    // Obtiene el origen del frontend. Si no está definida, se usará 'localhost' por defecto.
    FRONTEND_ORIGIN: getEnv("FRONTEND_ORIGIN", "localhost"),

    // Obtiene la URL de callback de Google del frontend. Si no está definida, lanzará un error.
    // FRONTEND_GOOGLE_CALLBACK_URL: getEnv("FRONTEND_GOOGLE_CALLBACK_URL"),
});

// Exportamos la configuración obtenida.
export const config = appConfig();
