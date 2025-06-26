import React from 'react';
import { format } from 'date-fns';
import { useDrop } from 'react-dnd';
import EventItem from './EventItem';

function DayCell({ day, events, isCurrentMonth, onAddEvent, onEditEvent, onMoveEvent }) {
  const [, drop] = useDrop({
    accept: 'EVENT',
    drop: (item) => {
      onMoveEvent(item.id, day);
    }
  });

  return (
    <div className={`day-cell ${isCurrentMonth ? '' : 'inactive'}`} ref={drop} onDoubleClick={() => onAddEvent(day)}>
      <div className="date-label">{format(day, 'd')}</div>
      <div className="events">
        {events.map(ev => (
          <EventItem key={ev.id + ev.dateTime} event={ev} onClick={() => onEditEvent(ev)} />
        ))}
      </div>
    </div>
  );
}

export default DayCell;
