import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
  user_id: string;
}
@injectable()
export class RentalDevolutionUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    if (!rental) throw new AppError("Rental does not exist!");

    const car = await this.carsRepository.findById(rental.car_id);

    const minimumDaily = 1;

    const currDate = this.dateProvider.currentDate();

    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.currentDate()
    );

    if (daily <= 0) daily = minimumDaily;

    const delay = this.dateProvider.compareInDays(
      currDate,
      rental.expected_return_date
    );

    let total = 0;

    if (delay > 0) {
      const calculateFine = delay * car.fine_amount;
      total = calculateFine;
    }
    total += daily * car.daily_rate;

    rental.end_date = this.dateProvider.currentDate();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateStatus(car.id, true);

    return rental;
  }
}
