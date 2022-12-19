import { Router } from "express";

import { SpecificationsRepository } from "../modules/cars/repositories/implementations/SpecificationRepository";
import { CreateSpecificationUseCase } from "../modules/cars/useCases/createSpecification/CreateSpecificationUseCase";

const specificationsRoutes = Router();
const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.post("/", (req, res) => {
  const { name, description } = req.body;
  const createSpecificationUseCaCreateSpecificationUseCase =
    new CreateSpecificationUseCase(specificationsRepository);

  createSpecificationUseCaCreateSpecificationUseCase.execute({
    name,
    description,
  });

  return res.status(201).send();
});

export { specificationsRoutes };
