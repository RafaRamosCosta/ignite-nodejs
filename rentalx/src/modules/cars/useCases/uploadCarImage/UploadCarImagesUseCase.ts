import { inject, injectable } from "tsyringe";

import { CarsImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarsImagesRepository";
import { IStorageProvider } from "@shared/container/providers/storageProvider/IStorageProvider";

interface IRequest {
  car_id: string;
  images_names: string[];
}
@injectable()
export class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: CarsImagesRepository,
    @inject("StorageProvider") private storageProvider: IStorageProvider
  ) {}

  async execute({ car_id, images_names }: IRequest) {
    images_names.map(async (image) => {
      await this.carsImagesRepository.create(car_id, image);
      await this.storageProvider.save(image, "cars");
    });
  }
}
