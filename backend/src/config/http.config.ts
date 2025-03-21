const httpConfig = () => ({
    OK: 200, // Solicitud exitosa
    CREATED: 201, // Recurso creado
    ACCEPTED: 202, // Solicitud aceptada, pero no completada
    NO_CONTENT: 204, // Solicitud exitosa, pero sin contenido en la respuesta
    
    BAD_REQUEST: 400, // Solicitud incorrecta (parámetros, etc.)
    UNAUTHORIZED: 401, // No autorizado (token de autenticación inválido)
    FORBIDDEN: 403, // Acceso prohibido
    NOT_FOUND: 404, // Recurso no encontrado
    METHOD_NOT_ALLOWED: 405, // Método HTTP no permitido
    
    INTERNAL_SERVER_ERROR: 500, // Error interno en el servidor
    NOT_IMPLEMENTED: 501, // Método no implementado
    BAD_GATEWAY: 502, // Error de puerta de enlace
    SERVICE_UNAVAILABLE: 503, // Servicio no disponible
    GATEWAY_TIMEOUT: 504, // Tiempo de espera agotado para la puerta de enlace
});


export const HTTPSTATUS = httpConfig();


export type HttpStatusCodeType = (typeof HTTPSTATUS[keyof typeof HTTPSTATUS])
