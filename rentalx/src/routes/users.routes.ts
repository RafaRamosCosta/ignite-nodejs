import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/cars/useCases/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();

usersRoutes.post("/", createUserController.handle);

const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.patch(
  "/avatar",
  ensureAuthentication,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

export { usersRoutes };
