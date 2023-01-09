import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { InMemoryUsersRepository } from "@modules/accounts/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryUsersTokensRepository } from "@modules/accounts/repositories/in-memory/InMemoryUsersTokensRepository";
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

describe("Authenticate a user", () => {
  let inMemoryUsersRepository: InMemoryUsersRepository;
  let inMemoryUsersTokensRepository: InMemoryUsersTokensRepository;
  let dayjsDateProvider: DayjsDateProvider;
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();

    inMemoryUsersTokensRepository = new InMemoryUsersTokensRepository();

    dayjsDateProvider = new DayjsDateProvider();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUsersRepository,
      inMemoryUsersTokensRepository,
      dayjsDateProvider
    );

    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to authenticate a user", async () => {
    const user: ICreateUserDTO = {
      name: "User test",
      password: "1234",
      email: "user@example.com",
      driver_license: "000123",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("shouldn't be able to authenticate a nonexistent user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "1234",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });

  it("shouldn't be able to authenticate with incorrect password", async () => {
    const user: ICreateUserDTO = {
      name: "User test name",
      password: "123",
      email: "user@example.com",
      driver_license: "00345",
    };

    await createUserUseCase.execute(user);
    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "incorret password",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });

  it("shouldn't be able to authenticate with incorrect email", async () => {
    const user: ICreateUserDTO = {
      name: "User test name",
      password: "123",
      email: "user@example.com",
      driver_license: "00345",
    };

    await createUserUseCase.execute(user);
    await expect(
      authenticateUserUseCase.execute({
        email: "incorrect email",
        password: user.password,
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });
});
