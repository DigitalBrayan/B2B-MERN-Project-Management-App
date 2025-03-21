// Importa los códigos de estado HTTP y los tipos personalizados desde su respectivo archivo de configuración
import { HTTPSTATUS, HttpStatusCodeType } from "../config/http.config"; 
// Importa el Enum de códigos de error personalizados
import { ErrorCodeEnum, ErrorCodeEnumType } from "../enums/error-code.enums";

// Definición de la clase AppError que extiende la clase Error de JavaScript
export class AppError extends Error {
  // Propiedades personalizadas que añaden más contexto al error
  public statusCode: HttpStatusCodeType; // Almacena el código de estado HTTP asociado al error
  public errorCode?: ErrorCodeEnumType; // Código de error personalizado basado en un Enum

  // El constructor de la clase que define cómo se debe crear un error con esta estructura
  constructor(
    message: string, // El mensaje que describe el error
    statusCode = HTTPSTATUS.INTERNAL_SERVER_ERROR, // El código de estado HTTP, por defecto 500 (Error interno del servidor)
    errorCode?: ErrorCodeEnumType // Código de error personalizado, opcional
  ) {
    super(message); // Llama al constructor de la clase Error con el mensaje del error
    this.statusCode = statusCode; // Asigna el código de estado HTTP
    this.errorCode = errorCode; // Asigna el código de error personalizado si se proporciona
    // Captura la pila de llamadas del error para su depuración
    Error.captureStackTrace(this, this.constructor);
  }
}

// Nueva clase HttpException para representar excepciones HTTP con códigos de estado específicos
export class HttpException extends AppError {
  // El constructor de HttpException permite crear un error HTTP con un mensaje, un código de estado y un código de error específico
  constructor(
    message: "HTTP EXEPTION ERROR", // Mensaje que describe el tipo de error (por defecto es un error HTTP genérico)
    statusCode: HttpStatusCodeType, // El código de estado HTTP específico para este error
    errorCode?: ErrorCodeEnumType // Un código de error opcional basado en un Enum de errores
  ) {
    // Llama al constructor de AppError pasando el mensaje, el código de estado y el código de error
    super(message, statusCode, errorCode);
  }
}

// Clase específica para errores internos del servidor (HTTP 500)
export class InternalServerError extends AppError {
  constructor(
    message: "internal Server Error", // Mensaje que describe el error, en este caso por defecto "Error Interno del Servidor"
    errorCode?: ErrorCodeEnumType // Un código de error personalizado opcional
  ) {
    // Llama al constructor de AppError pasando el mensaje, el código de estado HTTP 500 y el código de error específico
    super(
      message, // Mensaje personalizado que describe el error (por defecto "internal Server Error")
      HTTPSTATUS.INTERNAL_SERVER_ERROR, // Asigna el código de estado 500 (Error interno del servidor)
      errorCode || ErrorCodeEnum.INTERNAL_SERVER_ERROR // Si no se pasa un código de error, se usa uno por defecto de ErrorCodeEnum.INTERNAL_SERVER_ERROR
    );
  }
}

// Clase específica para errores de solicitud incorrecta (HTTP 400)
export class BadRequestExeption extends AppError {
  constructor(
    message: "Bad Request", // Mensaje que describe el error (por defecto "Bad Request")
    errorCode?: ErrorCodeEnumType // Un código de error personalizado opcional
  ) {
    // Llama al constructor de AppError pasando el mensaje, el código de estado HTTP 400 (Solicitud incorrecta) y el código de error específico
    super(
      message, // Mensaje personalizado que describe el error (por defecto "Bad Request")
      HTTPSTATUS.BAD_REQUEST, // Asigna el código de estado 400 (Bad Request)
      errorCode || ErrorCodeEnum.VALIDATION_ERROR // Si no se pasa un código de error, se usa uno por defecto de ErrorCodeEnum.VALIDATION_ERROR
    );
  }
}

// Clase específica para errores de acceso no autorizado (HTTP 401)
export class UnauthorizaedExeption extends AppError {
  constructor(
    message: "UNATHORIZED ACCESS", // Mensaje que describe el error, por defecto "Acceso no autorizado"
    errorCode?: ErrorCodeEnumType // Un código de error personalizado opcional
  ) {
    // Llama al constructor de AppError pasando el mensaje, el código de estado HTTP 401 (Acceso no autorizado) y el código de error específico
    super(
      message, // Mensaje personalizado que describe el error (por defecto "Acceso no autorizado")
      HTTPSTATUS.UNAUTHORIZED, // Asigna el código de estado 401 (Unauthorized)
      errorCode || ErrorCodeEnum.ACCESS_UNAUTHORIZED // Si no se pasa un código de error, se usa uno por defecto de ErrorCodeEnum.ACCESS_UNAUTHORIZED
    );
  }
}
