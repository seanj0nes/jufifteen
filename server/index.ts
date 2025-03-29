import express from "express";
import { createServer } from "http";
import { setupVite, log } from "./vite";

// Crear aplicación Express
const app = express();
const port = process.env.PORT || 5000;

// Crear servidor HTTP
const server = createServer(app);

// Configurar Vite para desarrollo
setupVite(app, server)
  .then(() => {
    // Iniciar servidor
    server.listen(port, () => {
      log(`Servidor corriendo en el puerto ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error al iniciar el servidor:", error);
  });