import { inject, injectable } from "tsyringe";

import { CarsImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarsImagesRepository";

interface IRequest {
  car_id: string;
  images_names: string[];
}
@injectable()
export class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: CarsImagesRepository
  ) {}

  async execute({ car_id, images_names }: IRequest) {
    images_names.map(async (name) => {
      await this.carsImagesRepository.create(car_id, name);
    });
  }
}
