import "express-async-errors";

import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import "../typeorm";
import "@shared/container";

import { AppError } from "@shared/errors/AppError";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError)
    return res.status(err.statusCode).json({ message: err.message });

  return res.status(500).json({
    status: "error",
    message: `Internal Server Error - ${err.message}`,
  });
});

app.listen(3333);
