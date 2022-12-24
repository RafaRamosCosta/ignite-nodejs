import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

describe("Authenticate a user", () => {
  let inMemoryUsersRepository: InMemoryUsersRepository;
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();

    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);

    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUsersRepository
    );
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
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("shouldn't be able to authenticate with incorrect password", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "User test name",
        password: "123",
        email: "user@example.com",
        driver_license: "00345",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "incorret password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("shouldn't be able to authenticate with incorrect email", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "User test name",
        password: "123",
        email: "user@example.com",
        driver_license: "00345",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: "incorrect email",
        password: user.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
