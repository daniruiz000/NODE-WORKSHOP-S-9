import swaggerUiExpress from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { swaggerOptions } from "../swagger-options";
import express, { type Response, type Request } from "express";
import { connect } from "../server/connect.middleware";
import { authorRouter } from "./author.routes";
import { bookRouter } from "./book.routes";
import { publisherRouter } from "./publisher.routes";
import { infoReq } from "../server/infoReq.middleware";
import { checkErrorRequest } from "../domain/services/checkErrorRequest.middleware";

export const configureRoutes = (app: any): any => {
  // Swagger
  const specs = swaggerJsDoc(swaggerOptions);
  app.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

  // Definimos el routerHome que será el encargado de manejar las peticiones a nuestras rutas en la raíz.
  const routerHome = express.Router();
  routerHome.get("/", (req: Request, res: Response) => {
    res.send(`
      <h3>Esta es la RAIZ de nuestra API.</h3>
    `);
  });
  routerHome.get("*", (req: Request, res: Response) => {
    res.status(404).send("Lo sentimos :( No hemos encontrado la página solicitada.");
  });

  // Middleware previo de Info de la req.
  app.use(infoReq);

  // Middleware de conexión a BBDD
  app.use(connect);

  // Usamos las rutas
  app.use("/author", authorRouter);
  app.use("/book", bookRouter);
  app.use("/publisher", publisherRouter);
  app.use("/public", express.static("public"));
  app.use("/", routerHome);

  // Middleware de gestión de los Errores de las peticiones.
  app.use(checkErrorRequest);

  return app;
};
