export function isNewPeriodNeeded(startDate: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);

  // If more than 5 days have passed since the start date
  const daysDiff = Math.floor(
    (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );
  return daysDiff >= 5;
}
