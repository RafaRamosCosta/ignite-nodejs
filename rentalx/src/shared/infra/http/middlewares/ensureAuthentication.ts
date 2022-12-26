import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new AppError("Missing token!", 401);

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(
      token,
      "9b8e28c955f001bd8bc1d810d114a00f"
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(userId);

    if (!user) throw new AppError("User does not exist!", 401);

    req.user = {
      id: userId,
    };

    next();
  } catch (error) {
    throw new AppError("Invalid token!", 401);
  }
}
