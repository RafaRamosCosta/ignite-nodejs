import { InMemoryCarsRepository } from "@modules/cars/repositories/in-memory/InMemoryCarsRepository";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

describe("List cars", () => {
  let inMemoryCarsRepository: InMemoryCarsRepository;
  let listAvailableCarsUseCase: ListAvailableCarsUseCase;

  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      inMemoryCarsRepository
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await inMemoryCarsRepository.create({
      name: "Car1",
      description: "Description test",
      daily_rate: 140.0,
      license_plate: "BAC-1313",
      fine_amount: 40,
      brand: "Test brand 1",
      category_id: "category_id test",
    });
    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await inMemoryCarsRepository.create({
      name: "Car2",
      description: "Description test",
      daily_rate: 140.0,
      license_plate: "BAC-1313",
      fine_amount: 40,
      brand: "Test brand 2",
      category_id: "category_id test",
    });
    const cars = await listAvailableCarsUseCase.execute({
      brand: "Test brand 2",
    });
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await inMemoryCarsRepository.create({
      name: "Car3",
      description: "Description test",
      daily_rate: 140.0,
      license_plate: "BAC-1313",
      fine_amount: 40,
      brand: "Test brand 2",
      category_id: "category_id test",
    });
    const cars = await listAvailableCarsUseCase.execute({
      name: "Car3",
    });
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await inMemoryCarsRepository.create({
      name: "Car3",
      description: "Description test",
      daily_rate: 140.0,
      license_plate: "BAC-1313",
      fine_amount: 40,
      brand: "Test brand 2",
      category_id: "1234",
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "1234",
    });
    expect(cars).toEqual([car]);
  });
});
