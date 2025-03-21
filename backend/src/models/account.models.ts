// import mongoose, {Document, Schema} from "mongoose";
// import { ProviderEnum, ProviderEnumType } from "../enums/account-provider.enums";


// export interface AccountDocument extends Document {
//     provider: ProviderEnumType;
//     providerId: string; //almacenar id de google, facebook, etc
//     userId: mongoose.Types.ObjectId;
//     refreshToken: string | null;
//     tokenExpiry: Date | null;
//     createAt: Date;
// }

// const accountSchema = new Schema<AccountDocument>({
//     userId:{
//         type: Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//     },
//     provider: {
//         type: String, 
//         enum: Object.values(ProviderEnum),
//         required: true,
//     }, 
//     providerId: {
//         type: String, 
//         required: true, 
//         unique: true, 
//     }, 
//     refreshToken: {
//         type: String,
//         default: null, 
//     },
//     tokenExpiry: {
//         type: Date,
//         default: null,
//     },
// },{
// timestamps: true, 
// toJSON: {
//     transform(doc, ret)
// {
//     delete ret.refreshToken
// }}
// })

// Importando las dependencias necesarias de mongoose
import mongoose, { Document, Schema } from "mongoose";

// Importamos un enum que define los proveedores posibles (como Google, Facebook, etc.)
import { ProviderEnum, ProviderEnumType } from "../enums/account-provider.enums";

// Definimos la interfaz que representa un documento de cuenta en MongoDB
export interface AccountDocument extends Document {
    provider: ProviderEnumType; // Tipo del proveedor, puede ser uno de los valores definidos en el enum
    providerId: string; // ID del proveedor, por ejemplo, el ID de Google, Facebook, etc.
    userId: mongoose.Types.ObjectId; // ID del usuario al que pertenece la cuenta
    refreshToken: string | null; // Token de actualización, puede ser null si no hay token
    tokenExpiry: Date | null; // Fecha de expiración del token, puede ser null si no está definido
    createAt: Date; // Fecha de creación del documento, la maneja Mongoose automáticamente si usamos timestamps
}

// Definimos el esquema de Mongoose para la colección de cuentas
const accountSchema = new Schema<AccountDocument>({
    // Definimos el campo 'userId' que referencia a un documento de la colección "User"
    userId: {
        type: Schema.Types.ObjectId, // Tipo de datos: ObjectId de Mongoose
        ref: "User", // Referencia al modelo "User", establece una relación con la colección "User"
        required: true, // El campo es obligatorio
    },
    // El campo 'provider' que contiene el nombre del proveedor (Google, Facebook, etc.)
    provider: {
        type: String, // Tipo de datos: String
        enum: Object.values(ProviderEnum), // Se limita a los valores definidos en el enum 'ProviderEnum'
        required: true, // El campo es obligatorio
    },
    // El campo 'providerId' almacena el ID del proveedor (por ejemplo, el ID de Google)
    providerId: {
        type: String, // Tipo de datos: String
        required: true, // El campo es obligatorio
        unique: true, // El campo debe ser único, no puede repetirse en la colección
    },
    // El campo 'refreshToken' almacena un token de actualización (si existe)
    refreshToken: {
        type: String, // Tipo de datos: String
        default: null, // Valor por defecto es null si no se proporciona un token
    },
    // El campo 'tokenExpiry' almacena la fecha de expiración del token
    tokenExpiry: {
        type: Date, // Tipo de datos: Date
        default: null, // Valor por defecto es null si no se define una fecha de expiración
    },
}, {
    // Configuraciones adicionales del esquema
    timestamps: true, // Mongoose añade automáticamente los campos 'createdAt' y 'updatedAt'
    
    // Configuración para transformar los documentos antes de enviarlos como JSON
    toJSON: {
        transform(doc, ret) {
            // Eliminar el campo 'refreshToken' antes de enviar el documento como JSON
            delete ret.refreshToken;
        }
    }
});

// Exportamos el modelo basado en el esquema definido
const AccountModel = mongoose.model<AccountDocument>("Account", accountSchema);
export  default AccountModel;