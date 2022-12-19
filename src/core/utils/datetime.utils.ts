export const datetimeWithTzToSameUTC = (date: Date) => {
  const offset = +process.env.TIME_ZONE_OFFSET_IN_MINUTES;
  date.setMinutes(date.getMinutes() + offset);
  return new Date(date);
};
