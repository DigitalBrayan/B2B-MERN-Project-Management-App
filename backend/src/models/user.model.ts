// Importa las dependencias necesarias de mongoose y utilidades personalizadas para manejar contraseñas
import mongoose, { Document, Schema } from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt"; // Utilidades personalizadas para comparar y encriptar contraseñas

// Define la interfaz 'UserDocument' que extiende 'Document' de mongoose.
// Esta interfaz define cómo debe lucir un documento de usuario en la base de datos.
export interface UserDocument extends Document {
  name: string; // Nombre del usuario.
  email: string; // Correo electrónico del usuario (único y requerido).
  password?: string; // Contraseña del usuario (opcional, ya que podría no ser necesaria si usamos autenticación externa).
  profilePicture: string | null; // Foto de perfil del usuario (puede ser null si no tiene).
  isActive: boolean; // Indica si la cuenta está activa o no.
  lastLogin: Date | null; // Fecha del último inicio de sesión (puede ser null si nunca ha iniciado sesión).
  createdAt: Date; // Fecha de creación del documento (Mongoose lo maneja automáticamente).
  updatedAt: Date; // Fecha de la última actualización del documento (Mongoose lo maneja automáticamente).
  currentWorkspace: mongoose.Types.ObjectId | null; // Referencia al espacio de trabajo del usuario (puede ser null si no pertenece a uno).
  
  // Método para comparar la contraseña almacenada con una nueva contraseña (utiliza una función asincrónica).
  comparePassword(value: string): Promise<boolean>;
  
  // Método para omitir la contraseña al devolver el documento (muy útil cuando se devuelve el usuario a través de una API).
  omitPassword(): Omit<UserDocument, "password">;
}

// Define el esquema de mongoose para el modelo de usuario, basado en la interfaz UserDocument.
const userSchema = new Schema<UserDocument>({
  name: {
    type: String,  // Tipo de dato String para el nombre.
    required: false,  // El nombre no es obligatorio.
    trim: true,  // Elimina los espacios en blanco al principio y al final.
  },
  email: {
    type: String,  // Tipo de dato String para el correo electrónico.
    required: true,  // El correo electrónico es obligatorio.
    unique: true,  // El correo electrónico debe ser único.
    trim: true,  // Elimina los espacios en blanco al principio y al final.
    lowercase: true,  // Convierte el correo electrónico a minúsculas automáticamente.
  },
  password: { 
    type: String, // El tipo de dato es String.
    select: true, // Permite seleccionar la contraseña cuando se hace una consulta, pero debería omitirse en la mayoría de los casos.
  },
  profilePicture: {
    type: String, 
    default: null, // Si no se proporciona una foto de perfil, se guarda como `null` por defecto.
  },
  currentWorkspace: {
    type: mongoose.Schema.Types.ObjectId,  // Se usa el tipo ObjectId para referirse al espacio de trabajo.
    ref: "WorkSpace" // Referencia al modelo 'WorkSpace', que debe existir en la base de datos.
  },
  isActive: {
    type: Boolean, 
    default: true // Por defecto, el usuario se considera activo.
  },
  lastLogin: {
    type: Date, 
    default: null  // Si no se ha iniciado sesión, la fecha de último inicio de sesión es `null`.
  }
}, {
  timestamps: true,  // Mongoose manejará automáticamente las propiedades `createdAt` y `updatedAt`.
});

// Middleware que se ejecuta antes de guardar el documento en la base de datos.
// Si la contraseña se ha modificado, la encripta usando el método 'hashValue'.
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {  // Verifica si el campo 'password' ha sido modificado.
    if (this.password) {
      this.password = await hashValue(this.password); // Encripta la contraseña antes de guardarla en la base de datos.
    }
  }
  next();  // Continua con el siguiente paso en el ciclo de vida de Mongoose.
});

// Método para eliminar la contraseña de un documento de usuario cuando se devuelve el objeto (ideal para no enviar la contraseña al cliente).
userSchema.methods.omitPassword = function (): Omit<UserDocument, "password"> {
  const userObject = this?.toObject();  // Convierte el documento de usuario a un objeto JavaScript normal.
  delete userObject.password;  // Elimina la propiedad 'password' del objeto.
  return userObject;  // Devuelve el objeto sin la propiedad 'password'.
};

// Método para comparar la contraseña proporcionada con la almacenada en la base de datos.
// Se utiliza el método 'compareValue' para comparar la contraseña proporcionada con la contraseña encriptada.
userSchema.methods.comparePassword = async function (value: string) {
  return compareValue(value, this.password);  // Compara las contraseñas y devuelve un valor booleano.
}

// Crea y exporta el modelo 'User' utilizando el esquema definido anteriormente.
const userModel = mongoose.model<UserDocument>("User", userSchema);

// Se exporta el modelo para que pueda ser utilizado en otras partes de la aplicación.
export default userModel;
