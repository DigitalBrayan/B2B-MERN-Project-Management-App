// Importa la configuración desde el archivo app.config
import { config } from "./app.config";

// Importa mongoose para la conexión a la base de datos MongoDB
import mongoose from "mongoose";

// Función para conectar a la base de datos
const connectDatabase = async () => {
  try {
    // Intenta conectarse a MongoDB usando la URI configurada en el archivo app.config
    await mongoose.connect(config.MONGO_URI);

    // Si la conexión es exitosa, muestra un mensaje en la consola
    console.log("📙 Connect DB");

  } catch (error) {
    // Si ocurre un error durante la conexión, muestra un mensaje de error en la consola
    console.log("ERROR DE CONEXION");

    // Sale del proceso con un código de error 1, lo cual indica que la conexión falló
    process.exit(1);
  }
};

// Exporta la función connectDatabase para usarla en otras partes de la aplicación
export default connectDatabase;
