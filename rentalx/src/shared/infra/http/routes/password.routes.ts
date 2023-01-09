import { Router } from "express";

import { SendForgotPasswordEmailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordEmailController";

const passwordRoutes = Router();

const sendForgotPasswordEmailController =
  new SendForgotPasswordEmailController();

passwordRoutes.post("/forgot", sendForgotPasswordEmailController.handle);

export { passwordRoutes };
