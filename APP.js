import React, { useState } from 'react';
import Calendar from './components/Calendar';
import EventForm from './components/EventForm';
import useLocalStorage from './hooks/useLocalStorage';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './styles/calendar.css';

function App() {
  const [events, setEvents] = useLocalStorage('calendarEvents', []);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddEvent = (date) => {
    setSelectedDate(date);
    setSelectedEvent(null);
    setIsFormOpen(true);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setIsFormOpen(true);
  };

  const handleSaveEvent = (event) => {
    if (event.id) {
      setEvents(events.map(e => e.id === event.id ? event : e));
    } else {
      setEvents([...events, { ...event, id: Date.now().toString() }]);
    }
    setIsFormOpen(false);
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
    setIsFormOpen(false);
  };

  const handleMoveEvent = (id, newDate) => {
    const updated = events.map(e => e.id === id ? { ...e, dateTime: newDate.toISOString() } : e);
    setEvents(updated);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <h1>Custom Event Calendar</h1>
        <Calendar
          events={events}
          onAddEvent={handleAddEvent}
          onEditEvent={handleEditEvent}
          onMoveEvent={handleMoveEvent}
        />
        {isFormOpen && (
          <EventForm
            date={selectedDate}
            event={selectedEvent}
            onSave={handleSaveEvent}
            onDelete={handleDeleteEvent}
            onClose={() => setIsFormOpen(false)}
          />
        )}
      </div>
    </DndProvider>
  );
}

export default App;
