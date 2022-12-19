import { Router } from "express";

import { createCategoryController } from "../modules/cars/useCases/createCategory/factory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories/factory";

const categoriesRoutes = Router();

categoriesRoutes.post("/", (req, res) =>
  createCategoryController.handle(req, res)
);

categoriesRoutes.get("/", (req, res) => {
  return listCategoriesController.handle(req, res);
});

export { categoriesRoutes };
