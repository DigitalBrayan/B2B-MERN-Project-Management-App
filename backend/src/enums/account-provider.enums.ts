// export const ProviderEnum = {
//    GOOGLE: "GOOGLE",
//    GITHUB: "GITHUB",
//    FACEBOOK: "FACEBOOK",
//    EMAIL: "EMAIL" 
// };

// export type ProviderEnumType  = keyof typeof  ProviderEnum;

// Definimos un objeto ProviderEnum que simula un enum en TypeScript.
// Este objeto tiene claves que representan los distintos proveedores de autenticación.
export const ProviderEnum = {
    GOOGLE: "GOOGLE",    // Proveedor Google
    GITHUB: "GITHUB",    // Proveedor GitHub
    FACEBOOK: "FACEBOOK", // Proveedor Facebook
    EMAIL: "EMAIL"       // Proveedor Email
 };
 
 // Definimos un tipo llamado ProviderEnumType que toma las claves del objeto ProviderEnum.
 // `keyof typeof ProviderEnum` obtiene los nombres de las claves del objeto ProviderEnum (en este caso, 'GOOGLE', 'GITHUB', 'FACEBOOK', 'EMAIL').
 // Por lo tanto, el tipo ProviderEnumType puede ser uno de estos valores literales.
 export type ProviderEnumType = keyof typeof ProviderEnum;
 