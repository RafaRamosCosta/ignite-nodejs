import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthentication } from "@shared/infra/http/middlewares/ensureAuthentication";

const carsRoutes = Router();

const createCarController = new CreateCarController();
carsRoutes.post(
  "/",
  ensureAuthentication,
  ensureAdmin,
  createCarController.handle
);

const listAvailableCarsController = new ListAvailableCarsController();
carsRoutes.get("/available", listAvailableCarsController.handle);

const createCarSpecificationController = new CreateCarSpecificationController();
carsRoutes.post(
  "/specifications/:id",
  ensureAuthentication,
  ensureAdmin,
  createCarSpecificationController.handle
);

export { carsRoutes };
