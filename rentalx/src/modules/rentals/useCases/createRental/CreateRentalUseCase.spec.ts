import dayjs from "dayjs";

import { InMemoryRentalsRepository } from "@modules/rentals/repositories/in-memory/InMemoryRentalsRepository";
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

describe("Create Rental", () => {
  const plusOneDay = dayjs().add(1, "day").toDate();
  let inMemoryRentalsRepository: InMemoryRentalsRepository;
  let dayJsDateProvider: DayjsDateProvider;
  let createRentalUseCase: CreateRentalUseCase;

  beforeEach(() => {
    inMemoryRentalsRepository = new InMemoryRentalsRepository();
    dayJsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      inMemoryRentalsRepository,
      dayJsDateProvider
    );
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "1313",
      expected_return_date: plusOneDay,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("shouldn't be able to create a new rental to a user that is already renting", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "1313",
        expected_return_date: plusOneDay,
      });

      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "1313",
        expected_return_date: plusOneDay,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("shouldn't be able to create a new rental to a car that is already being rented", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "test",
        expected_return_date: plusOneDay,
      });

      await createRentalUseCase.execute({
        user_id: "321",
        car_id: "test",
        expected_return_date: plusOneDay,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("shouldn't be able to create a new rental for less than 24 hours", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "test",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
