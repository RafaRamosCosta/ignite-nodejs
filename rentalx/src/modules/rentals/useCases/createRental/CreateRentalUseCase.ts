import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}
@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minRentalHour = 24;

    const carAlreadyRented = await this.rentalsRepository.findOpenRentalByCarId(
      car_id
    );

    if (carAlreadyRented) throw new AppError("This car is unavailable!");

    const userAlreadyRenting =
      await this.rentalsRepository.findOpenRentalByUserId(user_id);

    if (userAlreadyRenting)
      throw new AppError("You're already renting a vehicle!");

    const currDate = this.dateProvider.currentDate();

    const compare = this.dateProvider.compareInHours(
      currDate,
      expected_return_date
    );

    if (compare < minRentalHour)
      throw new AppError("A rental must have at least a 24 hour duration");

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}
