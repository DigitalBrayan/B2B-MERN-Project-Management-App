// Importa el módulo 'bcrypt' para poder usar sus funciones de encriptación y comparación de contraseñas
import bcrypt from "bcrypt"; 

// Función para encriptar (hashear) un valor (generalmente una contraseña)
// Recibe un valor 'value' que es el texto que queremos encriptar
// 'saltRounds' es la cantidad de "sal" que se usa para encriptar la contraseña, por defecto es 10
export const hashValue = async (value: string, saltRounds: number = 10) => 
    // Usa bcrypt.hash para generar el hash de la contraseña.
    await bcrypt.hash(value, saltRounds);

// Función para comparar una contraseña en texto plano con una versión hasheada (almacenada en la base de datos)
// Recibe dos parámetros: 
// 'value' es el valor en texto plano que queremos comparar, 
// 'hashValue' es el hash almacenado en la base de datos.
export const compareValue = async (value: string, hashValue: string) => 
    // Usa bcrypt.compare para comparar la contraseña en texto plano con el hash almacenado.
    await bcrypt.compare(value, hashValue);
