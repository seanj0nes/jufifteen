import type { Express } from "express";
import { createServer, type Server } from "http";

export function registerRoutes(app: Express): Server {
  // Ya no necesitamos rutas API porque formsubmit.co maneja los formularios
  return createServer(app);
}