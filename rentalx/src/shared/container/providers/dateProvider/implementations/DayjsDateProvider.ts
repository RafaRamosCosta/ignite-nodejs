import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

export class DayjsDateProvider implements IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number {
    const end_date_utc = this.formatToUTC(end_date);
    const start_date_utc = this.formatToUTC(start_date);
    return dayjs(end_date_utc).diff(start_date_utc, "hours");
  }

  formatToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  currentDate(): Date {
    return dayjs().toDate();
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const end_date_utc = this.formatToUTC(end_date);
    const start_date_utc = this.formatToUTC(start_date);

    return dayjs(end_date_utc).diff(start_date_utc, "days");
  }

  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, "hours").toDate();
  }
}
