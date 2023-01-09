import { Router } from "express";

import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post("/sessions", authenticateUserController.handle);

const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticateRoutes };
