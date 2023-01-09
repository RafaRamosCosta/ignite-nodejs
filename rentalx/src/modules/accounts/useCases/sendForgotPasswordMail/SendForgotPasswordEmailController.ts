import { Request, Response } from "express";
import { container } from "tsyringe";

import { SendForgotPasswordEmailUseCase } from "./SendForgotPasswordUseCase";

export class SendForgotPasswordEmailController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendForgotPasswordEmailUseCase = container.resolve(
      SendForgotPasswordEmailUseCase
    );

    await sendForgotPasswordEmailUseCase.execute(email);

    return res.send();
  }
}
