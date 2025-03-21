//nos va ayudar a manejar el env
// Función que ayuda a obtener el valor de una variable de entorno
export const getEnv = (key: string, defaultValue: string = ""): string => {
    // Intenta obtener el valor de la variable de entorno desde process.env
    const value = process.env[key];
    
    // Si no encuentra la variable de entorno:
    if (!value) {
        // Si se ha pasado un valor por defecto, lo devuelve
        if (defaultValue) {
            return defaultValue;
        }
        // Si no tiene valor por defecto, lanza un error
        throw new Error(`Enviroment variable ${key} is not set`);
    }
    // Si encuentra la variable de entorno, devuelve su valor
    return value;
}
