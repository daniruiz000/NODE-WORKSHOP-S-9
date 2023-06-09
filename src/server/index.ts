import express from "express";
import cors from "cors";
import { configureRoutes } from "../routes";
import { checkErrorServer } from "./checkErrorServer.middleware";

// Configuración del server
export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
// Middleware de gestión de los Errores del servidor.
app.use(checkErrorServer);
configureRoutes(app);
