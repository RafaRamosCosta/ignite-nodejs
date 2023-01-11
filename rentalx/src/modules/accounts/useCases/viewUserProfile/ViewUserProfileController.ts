import { Request, Response } from "express";
import { container } from "tsyringe";

import { ViewUserProfileUseCase } from "./ViewUserProfileUseCase";

export class ViewUserProfileController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const viewUserProfileUseCase = container.resolve(ViewUserProfileUseCase);

    const user = await viewUserProfileUseCase.execute(id);
    return res.json(user);
  }
}
