import React from 'react';
import { useDrag } from 'react-dnd';

function EventItem({ event, onClick }) {
  const [, drag] = useDrag(() => ({
    type: 'EVENT',
    item: { id: event.id }
  }));

  return (
    <div ref={drag} className="event-item" onClick={onClick} style={{ backgroundColor: event.color }}>
      {event.title}
    </div>
  );
}

export default EventItem;
