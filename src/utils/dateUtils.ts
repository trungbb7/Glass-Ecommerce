export function getRemaingTime(targetDate: Date): {
  days_count: number;
  hours_count: number;
  minutes_count: number;
  seconds_count: number;
} {
  const currentDate = new Date();
  const milliseconds = targetDate.getTime() - currentDate.getTime();

  const oneDayInMilliseconds = 1000 * 60 * 60 * 24;

  const oneHourInMiliseconds = 1000 * 60 * 60;

  const oneMinuteInMiliseconds = 1000 * 60;

  const oneSecondInMiliseconds = 1000;

  const days_count = Math.floor(milliseconds / oneDayInMilliseconds);
  const hours_count = Math.floor(
    (milliseconds - days_count * oneDayInMilliseconds) / oneHourInMiliseconds,
  );
  const minutes_count = Math.floor(
    (milliseconds -
      days_count * oneDayInMilliseconds -
      hours_count * oneHourInMiliseconds) /
      oneMinuteInMiliseconds,
  );
  const seconds_count = Math.floor(
    (milliseconds -
      days_count * oneDayInMilliseconds -
      hours_count * oneHourInMiliseconds -
      minutes_count * oneMinuteInMiliseconds) /
      oneSecondInMiliseconds,
  );

  return {
    days_count,
    hours_count,
    minutes_count,
    seconds_count,
  };
}
