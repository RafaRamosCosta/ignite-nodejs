import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  specifications_ids: string[];
}
@injectable()
export class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ car_id, specifications_ids }: IRequest): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findById(car_id);

    if (!carAlreadyExists) throw new AppError("Car does not exist!");

    const specifications = await this.specificationsRepository.findByIds(
      specifications_ids
    );

    carAlreadyExists.specifications = specifications;

    await this.carsRepository.create(carAlreadyExists);

    return carAlreadyExists;
  }
}
