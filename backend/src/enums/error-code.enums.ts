export const ErrorCodeEnum = {
    // Errores de autenticación
    AUTH_EMAIL_ALREADY_EXISTS: "AUTH_EMAIL_ALREADY_EXISTS", // El correo electrónico ya está registrado
    AUTH_TOKEN_INVALID: "AUTH_TOKEN_INVALID",               // Token de autenticación inválido
    AUTH_USER_NOT_FOUND: "AUTH_USER_NOT_FOUND",             // El usuario no se encuentra en el sistema
    AUTH_NO_FOUND: "AUTH_NO_FOUND",                         // Error general de autenticación
    AUTH_TOO_MANY_ATTEMPTS: "AUTH_TOO_MANY_ATTEMPTS",       // Demasiados intentos fallidos de autenticación

    // Errores de autorización
    AUTH_ACCESS_UNAUTHORIZED: "AUTH_ACCESS_UNAUTHORIZED", 
    ACCESS_UNAUTHORIZED: "ACCESS_UNAUTHORIZED"      ,                    // Usuario no autorizado
    AUTH_TOKEN_NOT_FOUND: "AUTH_TOKEN_NOT_FOUND",                         // El token de autenticación ha expirado
    VALIDATION_ERROR: "VALIDATION_ERROR",                   // Error de validación de los datos
    RESOURCES_NOT_FOUND: "RESOURCES_NOT_FOUND",             // Recurso no encontrado
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",         // Error interno del servidor
}as const;

export type ErrorCodeEnumType = keyof typeof ErrorCodeEnum;
