import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ViewUserProfileController } from "@modules/accounts/useCases/viewUserProfile/ViewUserProfileController";
import { ensureAuthentication } from "@shared/infra/http/middlewares/ensureAuthentication";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();

usersRoutes.post("/", createUserController.handle);

const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.patch(
  "/avatar",
  ensureAuthentication,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

const viewUserProfileController = new ViewUserProfileController();

usersRoutes.get(
  "/profile",
  ensureAuthentication,
  viewUserProfileController.handle
);

export { usersRoutes };
