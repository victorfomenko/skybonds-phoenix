export const getStartDateByPeriod = (endDate, period) => {
  var date, descriptor, match, month, value;
  date = new Date(endDate);
  match = /^([0-9]+)(.*)$/.exec(period);

  if (!match) {
    return date;
  }
  value = Number(match[1]);
  descriptor = (String(match[2])).toLowerCase();
  month = date.getMonth();

  if (!value) {
    return date;
  }
  switch (descriptor) {
    case 'y':
      date.setFullYear(date.getFullYear() - value);
      break;
    case 'q':
      date.setMonth(date.getMonth() - value * 3);
      break;
    case 'm':
      date.setMonth(date.getMonth() - value);
      if (date.getMonth() === month) {
        date.setDate(0);
      }
      break;
    case 'w':
      date.setDate(date.getDate() - value * 7);
      break;
    default:
      date.setDate(date.getDate() - value);
  }
  return date;
};
