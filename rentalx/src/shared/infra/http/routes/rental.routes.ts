import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { RentalDevolutionController } from "@modules/rentals/useCases/rentalDevolution/RentalDevolutionController";

import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
rentalRoutes.post("/", ensureAuthentication, createRentalController.handle);

const rentalDevolutionController = new RentalDevolutionController();
rentalRoutes.post(
  "/devolution/:id",
  ensureAuthentication,
  rentalDevolutionController.handle
);
export { rentalRoutes };
