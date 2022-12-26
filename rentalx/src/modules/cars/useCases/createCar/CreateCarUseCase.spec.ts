import { InMemoryCarsRepository } from "@modules/cars/repositories/in-memory/InMemoryCarsRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

describe("Create Car", () => {
  let carsRepository: InMemoryCarsRepository;
  let createCarUseCase: CreateCarUseCase;

  beforeEach(() => {
    carsRepository = new InMemoryCarsRepository();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car name",
      description: "Description test",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "brand test",
      category_id: "category id test",
    });
    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with the same license_plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car 1",
        description: "Description test",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "brand test",
        category_id: "category id test",
      });

      await createCarUseCase.execute({
        name: "Car 2",
        description: "Description test",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "brand test",
        category_id: "category id test",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a car with the available property as true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car available",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABCD-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });
    expect(car.available).toBe(true);
  });
});
