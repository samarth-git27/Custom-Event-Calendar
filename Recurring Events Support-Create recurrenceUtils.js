import { addDays, addWeeks, addMonths, parseISO, isBefore, isAfter } from 'date-fns';

export const generateRecurringInstances = (event, start, end) => {
  const instances = [];
  const baseDate = parseISO(event.dateTime);
  let current = baseDate;

  const { type, interval = 1, days = [] } = event.recurrence || {};

  while (isBefore(current, end)) {
    const valid =
      type === 'daily' ||
      (type === 'weekly' && days.includes(current.getDay())) ||
      (type === 'monthly' && current.getDate() === baseDate.getDate());

    if (valid && isAfter(current, start)) {
      instances.push({ ...event, dateTime: current.toISOString(), isGenerated: true });
    }

    if (type === 'daily') current = addDays(current, interval);
    else if (type === 'weekly') current = addWeeks(current, interval);
    else if (type === 'monthly') current = addMonths(current, interval);
    else break;
  }

  return instances;
};
