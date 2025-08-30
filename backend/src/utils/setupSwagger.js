import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../swagger/swagger.js";

export const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
