import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new Error("Missing token!");

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(
      token,
      "9b8e28c955f001bd8bc1d810d114a00f"
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(userId);

    if (!user) throw new Error("User does not exist!");

    next();
  } catch (error) {
    throw new Error("Invalid token!");
  }
}
