# B2B MERN Project Management App - Backend

Este es un proyecto backend utilizando **Node.js**, **Express**, **MongoDB** y **Mongoose** para gestionar usuarios, autenticación, manejo de errores y otros aspectos clave del backend de una aplicación de gestión de proyectos. También se utiliza **bcrypt** para el manejo seguro de contraseñas.

## Requisitos

- Node.js >= 14.x
- npm >= 6.x
- MongoDB (local o en la nube como MongoDB Atlas)
- Archivo `.env` para configurar las variables de entorno

## Instalación

1. Clona este repositorio:

   ```bash
   git clone <URL_del_repositorio>
   cd <nombre_del_repositorio>
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura el archivo `.env` en la raíz del proyecto:

   ```env
   NODE_ENV=development
   PORT=5000
   DB_URI=mongodb://localhost:27017/your-db-name
   SESSION_SECRET=your-session-secret
   FRONTEND_ORIGIN=http://localhost:3000
   ```

4. Inicia la aplicación:

   ```bash
   npm start
   ```

   Esto arrancará el servidor en el puerto definido (por defecto, el puerto 5000).

## Estructura del Proyecto

La estructura del proyecto es la siguiente:

/backend
├── /src
│   ├── index.ts # Punto de entrada principal de la aplicación
│   ├── /@types # Definiciones de tipos personalizados para TypeScript
│   ├── /config
│   │   ├── app.config.ts # Configuración general de la aplicación (base path, entorno, etc.)
│   │   ├── bd.config.ts # Configuración de la base de datos (conexión con MongoDB)
│   │   ├── http.config.ts # Configuración de opciones HTTP
│   ├── /controllers # Controladores para manejar la lógica de negocio
│   ├── /enums
│   │   ├── error-code.enums.ts # Enumeraciones de códigos de error utilizados en la aplicación
│   ├── /middlewares
│   │   ├── asyncHandler.middleware.ts # Middleware para manejar funciones asíncronas y evitar try/catch repetidos
│   │   ├── errorHandler.middleware.ts # Middleware para manejar errores globalmente en la aplicación
│   ├── /models
│   │   ├── user.model.ts # Definición del esquema de usuario en MongoDB
│   ├── /routes # Definición de las rutas de la API
│   ├── /seeders # Archivos para poblar la base de datos con datos iniciales
│   ├── /services # Servicios que encapsulan la lógica de negocio
│   ├── /utils
│   │   ├── appError.ts # Clase para manejar errores personalizados en la aplicación
│   │   ├── bcrypt.ts # Utilidad para encriptar y comparar contraseñas con bcrypt
│   │   ├── get-env.ts # Funciones para obtener variables de entorno de manera segura
│   ├── /validation # Esquemas y validaciones de datos
## Características

### Conexión a la Base de Datos

El proyecto está configurado para conectarse a MongoDB utilizando **Mongoose**. La conexión se maneja en el archivo `bd.config.ts`:

```typescript
import mongoose from "mongoose";
import { config } from "./app.config";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(config.DB_URI);
    console.log("Base de datos conectada con éxito.");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1); // Detiene el proceso si la conexión falla
  }
};
Modelos de Datos (User)
El modelo User está definido en user.model.ts, utilizando Mongoose para crear el esquema del usuario. Este modelo tiene varias propiedades, como nombre, correo electrónico, contraseña (que se hashea antes de guardar), y más:

typescript
Copiar
const userSchema = new Schema<UserDocument>({
  name: { type: String, required: false, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, select: true },
  profilePicture: { type: String, default: null },
  currentWorkspace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "WorkSpace"
  },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date, default: null }
}, {
  timestamps: true
});
Middlewares
Error Handler Middleware
El middleware errorHandler.middleware.ts maneja los errores del servidor. Si el error es un SyntaxError (por ejemplo, un JSON mal formado), responde con un código 400. Si es un error personalizado (instancia de AppError), responde con el código y mensaje correspondientes. Para otros errores, responde con un 500.

typescript
Copiar
export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.error(`Error Ocurred on PATH: ${req.path}`, error);

  if (error instanceof SyntaxError) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: "Invalid JSON format. Por favor revisa tu petición"
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode
    });
  }

  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: "Internal server Error",
    error: error?.message || "Unknown error occurred",
  });
};
Async Handler Middleware
Este middleware maneja las funciones asíncronas de manera eficiente, capturando cualquier error que ocurra en los controladores.

typescript
Copiar
export const asyncHandler = (controller: AsyncControllersType): AsyncControllersType =>
  async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
Controladores
El controlador de usuarios (userController.ts) maneja las operaciones relacionadas con los usuarios. Esto incluye crear un nuevo usuario, actualizar su información, y verificar las contraseñas utilizando bcrypt para el hashing de contraseñas.

Manejo de Contraseñas
Las contraseñas se manejan de forma segura utilizando bcrypt. Se utilizan dos funciones:

hashValue: Para encriptar contraseñas antes de guardarlas en la base de datos.
compareValue: Para comparar la contraseña ingresada con la versión encriptada almacenada en la base de datos.
typescript
Copiar
import bcrypt from "bcrypt";

export const hashValue = async (value: string, saltRounds: number = 10) =>
  await bcrypt.hash(value, saltRounds);

export const compareValue = async (value: string, hashValue: string) =>
  await bcrypt.compare(value, hashValue);
Manejo de Errores Personalizados
Se crea una clase AppError para manejar errores personalizados que puedan ser lanzados en el servidor. Además, existen clases específicas para manejar diferentes tipos de errores, como InternalServerError, BadRequestException, etc.

typescript
Copiar
export class AppError extends Error {
  public statusCode: HttpStatusCodeType;
  public errorCode?: ErrorCodeEnumType;

  constructor(
    message: string,
    statusCode = HTTPSTATUS.INTERNAL_SERVER_ERROR,
    errorCode?: ErrorCodeEnumType
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
Rutas y Respuestas
La ruta raíz (/) está configurada para responder con un mensaje "holaaa":

typescript
Copiar
app.get("/", asyncHandler(async (req, res, next) => {
  return res.status(HTTPSTATUS.OK).json({
    message: "holaaa"
  });
}));
Errores
Si se produce un error de tipo BadRequestException, se manejará adecuadamente mediante el middleware de errores y se devolverá una respuesta con el código de estado 400.

typescript
Copiar
throw new BadRequestException("This is bad request");
Funcionalidades Clave
Autenticación y Gestión de Usuarios

El modelo de usuario (user.model.ts) gestiona la estructura y los métodos para manipular los documentos de usuario en la base de datos, como la comparación de contraseñas encriptadas usando bcrypt.
Los controladores de usuario (userController.ts) manejan las solicitudes HTTP relacionadas con la creación, actualización y eliminación de usuarios.
Manejo de Errores

Middlewares como errorHandler.middleware.ts y asyncHandler.middleware.ts permiten manejar los errores de manera centralizada y adecuada, respondiendo con el mensaje y código de error apropiados.
Encriptación de Contraseñas

bcrypt.ts tiene funciones como hashValue y compareValue para encriptar y comparar contraseñas de manera segura.
Instalación
Clona el repositorio:

bash
Copiar
git clone https://github.com/tu-usuario/b2b-mern-project-management-app-backend.git
Instala las dependencias:

bash
Copiar
cd b2b-mern-project-management-app-backend
npm install
Configura las variables de entorno: Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables de entorno:

env
Copiar
MONGODB_URI=tu_uri_de_mongodb
JWT_SECRET=tu_secreto_de_jwt
Inicia el servidor:

bash
Copiar
npm start
Uso
Una vez que el servidor esté en ejecución, puedes realizar peticiones HTTP a las rutas definidas en el controlador de usuarios, tales como:

POST /users/register: Para registrar un nuevo usuario.
POST /users/login: Para iniciar sesión con un usuario registrado.
Contribuciones
Si deseas contribuir a este proyecto, puedes hacerlo mediante pull requests. Asegúrate de crear un fork del repositorio, realizar tus cambios y enviar un pull request con una descripción detallada de las modificaciones realizadas.
```
