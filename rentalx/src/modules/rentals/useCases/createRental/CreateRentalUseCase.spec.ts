import dayjs from "dayjs";

import { InMemoryCarsRepository } from "@modules/cars/repositories/in-memory/InMemoryCarsRepository";
import { InMemoryRentalsRepository } from "@modules/rentals/repositories/in-memory/InMemoryRentalsRepository";
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

describe("Create Rental", () => {
  const plusOneDay = dayjs().add(1, "day").toDate();
  let inMemoryRentalsRepository: InMemoryRentalsRepository;
  let inMemoryCarsRepository: InMemoryCarsRepository;
  let dayJsDateProvider: DayjsDateProvider;
  let createRentalUseCase: CreateRentalUseCase;

  beforeEach(() => {
    inMemoryRentalsRepository = new InMemoryRentalsRepository();
    inMemoryCarsRepository = new InMemoryCarsRepository();
    dayJsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      inMemoryRentalsRepository,
      dayJsDateProvider,
      inMemoryCarsRepository
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await inMemoryCarsRepository.create({
      name: "Test",
      description: "Test description",
      daily_rate: 100,
      license_plate: "12345",
      fine_amount: 40,
      category_id: "89403",
      brand: "brand test",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: plusOneDay,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("shouldn't be able to create a new rental to a user that is already renting", async () => {
    await inMemoryRentalsRepository.create({
      user_id: "12345",
      car_id: "1313",
      expected_return_date: plusOneDay,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "1212",
        expected_return_date: plusOneDay,
      })
    ).rejects.toEqual(new AppError("You're already renting a vehicle!"));
  });

  it("shouldn't be able to create a new rental to a car that is already being rented", async () => {
    await inMemoryRentalsRepository.create({
      user_id: "322",
      car_id: "test",
      expected_return_date: plusOneDay,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "321",
        car_id: "test",
        expected_return_date: plusOneDay,
      })
    ).rejects.toEqual(new AppError("This car is unavailable!"));
  });

  it("shouldn't be able to create a new rental for less than 24 hours", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "123",
        car_id: "test",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(
      new AppError("A rental must have at least a 24 hour duration!")
    );
  });
});
