export interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  formatToUTC(date: Date): string;
  currentDate(): Date;
  compareInDays(start_date: Date, end_date: Date): number;
  addDays(days: number): Date;
}
