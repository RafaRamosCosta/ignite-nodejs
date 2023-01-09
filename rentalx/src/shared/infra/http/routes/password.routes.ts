import { Router } from "express";

import { ResetPasswordController } from "@modules/accounts/useCases/resetPassword/ResetPasswordController";
import { SendForgotPasswordEmailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordEmailController";

const passwordRoutes = Router();

const sendForgotPasswordEmailController =
  new SendForgotPasswordEmailController();

passwordRoutes.post("/forgot", sendForgotPasswordEmailController.handle);

const resetPasswordController = new ResetPasswordController();

passwordRoutes.post("/reset", resetPasswordController.handle);

export { passwordRoutes };
