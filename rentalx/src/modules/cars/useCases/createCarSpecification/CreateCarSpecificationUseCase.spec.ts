import { InMemoryCarsRepository } from "@modules/cars/repositories/in-memory/InMemoryCarsRepository";
import { InMemorySpecificationsRepository } from "@modules/cars/repositories/in-memory/InMemorySpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

describe("Create car specification", () => {
  let inMemoryCarsRepository: InMemoryCarsRepository;
  let inMemorySpecificationsRepository: InMemorySpecificationsRepository;
  let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository();
    inMemorySpecificationsRepository = new InMemorySpecificationsRepository();

    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      inMemoryCarsRepository,
      inMemorySpecificationsRepository
    );
  });

  it("should be able to assign a new specification to the car", async () => {
    const car = await inMemoryCarsRepository.create({
      name: "Car 1",
      description: "Description test",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "brand test",
      category_id: "category id test",
    });

    const specification = await inMemorySpecificationsRepository.create({
      name: "name test",
      description: "description test",
    });

    const specifications_ids = [specification.id];

    const carsSpecifications = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_ids,
    });

    expect(carsSpecifications).toHaveProperty("specifications");
    expect(carsSpecifications.specifications).toHaveLength(1);
  });

  it("should not be able to assign a new specification to a nonexistent car", async () => {
    expect(async () => {
      const car_id = "1234";
      const specifications_ids = ["54321"];
      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_ids,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
