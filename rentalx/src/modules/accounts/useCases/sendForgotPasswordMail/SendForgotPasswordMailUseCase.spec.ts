import { InMemoryUsersRepository } from "@modules/accounts/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryUsersTokensRepository } from "@modules/accounts/repositories/in-memory/InMemoryUsersTokensRepository";
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayjsDateProvider";
import { InMemoryMailProvider } from "@shared/container/providers/mailProvider/in-memory/InMemoryMailProvider";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordEmailUseCase } from "./SendForgotPasswordUseCase";

describe("Send forgot passowrd mail", () => {
  let sendForgotPasswordMailUseCase: SendForgotPasswordEmailUseCase;
  let inMemoryUsersRepository: InMemoryUsersRepository;
  let inMemoryUsersTokensRepository: InMemoryUsersTokensRepository;
  let dayjsDateProvider: DayjsDateProvider;
  let mailProvider: InMemoryMailProvider;

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryUsersTokensRepository = new InMemoryUsersTokensRepository();
    dayjsDateProvider = new DayjsDateProvider();
    mailProvider = new InMemoryMailProvider();

    sendForgotPasswordMailUseCase = new SendForgotPasswordEmailUseCase(
      inMemoryUsersRepository,
      inMemoryUsersTokensRepository,
      dayjsDateProvider,
      mailProvider
    );
  });

  it("should be able to send a password recovery email", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await inMemoryUsersRepository.create({
      driver_license: "4353645",
      email: "test@example.com",
      name: "Fael",
      password: "123456",
    });

    await sendForgotPasswordMailUseCase.execute("test@example.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("shouldn't be able to send a password recovery email to nonexistent user", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("nonexistent@fail.com")
    ).rejects.toEqual(new AppError("User does not exist!"));
  });

  it("should be able to create a user token", async () => {
    const generateUserToken = jest.spyOn(
      inMemoryUsersTokensRepository,
      "create"
    );

    await inMemoryUsersRepository.create({
      driver_license: "2038527",
      email: "test@example.com",
      name: "Raficha",
      password: "123456",
    });

    await sendForgotPasswordMailUseCase.execute("test@example.com");

    expect(generateUserToken).toHaveBeenCalled();
  });
});
