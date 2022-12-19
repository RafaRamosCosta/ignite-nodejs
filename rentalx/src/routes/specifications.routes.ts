import { Router } from "express";

import { createSpecificationController } from "../modules/cars/useCases/createSpecification/factory";

const specificationsRoutes = Router();

specificationsRoutes.post("/", (req, res) =>
  createSpecificationController.handle(req, res)
);

export { specificationsRoutes };
