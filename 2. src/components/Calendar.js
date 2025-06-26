import React, { useState } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths, format, isSameDay, isSameMonth, parseISO } from 'date-fns';
import DayCell from './DayCell';
import { generateRecurringInstances } from '../utils/recurrenceUtils';

function Calendar({ events, onAddEvent, onEditEvent, onMoveEvent }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const generateEvents = (date) => {
    let all = [];
    events.forEach(e => {
      const rec = generateRecurringInstances(e, startDate, endDate);
      all.push(...rec);
    });
    return all.filter(e => isSameDay(parseISO(e.dateTime), date));
  };

  const renderDays = () => {
    const rows = [];
    let day = startDate;
    while (day <= endDate) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        const dayEvents = generateEvents(day);
        week.push(
          <DayCell
            key={day}
            day={day}
            events={dayEvents}
            isCurrentMonth={isSameMonth(day, monthStart)}
            onAddEvent={onAddEvent}
            onEditEvent={onEditEvent}
            onMoveEvent={onMoveEvent}
          />
        );
        day = addDays(day, 1);
      }
      rows.push(<div className="row" key={day}>{week}</div>);
    }
    return rows;
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>◀</button>
        <h2>{format(currentMonth, 'MMMM yyyy')}</h2>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>▶</button>
      </div>
      <div className="calendar-grid">{renderDays()}</div>
    </div>
  );
}

export default Calendar;
