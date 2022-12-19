import { Router } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/cars/useCases/createCategory/factory";
import { importCategoryController } from "../modules/cars/useCases/importCategory/factory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories/factory";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

categoriesRoutes.post("/", (req, res) =>
  createCategoryController.handle(req, res)
);

categoriesRoutes.get("/", (req, res) =>
  listCategoriesController.handle(req, res)
);

categoriesRoutes.post("/import", upload.single("file"), (req, res) => {
  return importCategoryController.handle(req, res);
});

export { categoriesRoutes };
