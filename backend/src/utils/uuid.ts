// import { v4 as uuidv4 } from "uuid";


// export function generateInviteCode(){
//     return uuidv4().replace(/-/g, "").substring(0,8);
// }

// Importamos la función v4 de la librería 'uuid' que genera identificadores únicos universales (UUID).
// La renombramos como 'uuidv4' para poder utilizarla de manera más concisa en el código.
import { v4 as uuidv4 } from "uuid";

// Función para generar un código de invitación
export function generateInviteCode() {
    // Generamos un UUID usando uuidv4(), que genera un string único en formato estándar (por ejemplo, '123e4567-e89b-12d3-a456-426614174000')
    // Luego, eliminamos todos los guiones ('-') con .replace(/-/g, "").
    // Después, tomamos solo los primeros 8 caracteres con .substring(0, 8).
    // Esto genera un código único corto, pero lo suficientemente único para ser usado como un código de invitación.
    return uuidv4().replace(/-/g, "").substring(0, 8);
}
