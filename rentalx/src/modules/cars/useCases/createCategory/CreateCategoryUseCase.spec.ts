import { AppError } from "@shared/errors/AppError";
import { InMemoryCategoriesRepository } from "@modules/cars/repositories/in-memory/InMemoryCategoriesRepository";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

describe("Create a new category", () => {
  let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
  let createCategoryUseCase: CreateCategoryUseCase;

  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    createCategoryUseCase = new CreateCategoryUseCase(
      inMemoryCategoriesRepository
    );
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "Category test",
      description: "Description test",
    };
    await createCategoryUseCase.execute(category);
    const categoryCreated = await inMemoryCategoriesRepository.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("shouldn't be able to create a category that already exists!", async () => {
    expect(async () => {
      const category = {
        name: "Category test",
        description: "Description test",
      };
      await createCategoryUseCase.execute(category);
      await createCategoryUseCase.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
