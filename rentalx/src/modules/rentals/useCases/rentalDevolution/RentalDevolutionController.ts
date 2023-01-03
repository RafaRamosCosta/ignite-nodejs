import { Request, Response } from "express";
import { container } from "tsyringe";

import { RentalDevolutionUseCase } from "./RentalDevolutionUseCase";

export class RentalDevolutionController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user;
    const { id } = req.params;
    const retalDevolutionUseCase = container.resolve(RentalDevolutionUseCase);

    const rental = await retalDevolutionUseCase.execute({
      id,
      user_id,
    });

    return res.status(200).json(rental);
  }
}
