import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { formatISO } from 'date-fns';

function EventForm({ date, event, onSave, onDelete, onClose }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [color, setColor] = useState('#2196F3');
  const [recurrence, setRecurrence] = useState({ type: 'none', interval: 1, days: [] });

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDesc(event.description);
      setDateTime(event.dateTime);
      setColor(event.color || '#2196F3');
      setRecurrence(event.recurrence || { type: 'none', interval: 1, days: [] });
    } else {
      setDateTime(formatISO(date));
    }
  }, [event, date]);

  const handleSubmit = () => {
    onSave({
      id: event?.id,
      title,
      description: desc,
      dateTime,
      color,
      recurrence
    });
  };

  return (
    <Modal isOpen={true} onRequestClose={onClose} className="modal" overlayClassName="overlay">
      <h2>{event ? 'Edit Event' : 'Add Event'}</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" />
      <input type="datetime-local" value={dateTime.slice(0, 16)} onChange={(e) => setDateTime(e.target.value)} />
      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      <select value={recurrence.type} onChange={(e) => setRecurrence({ ...recurrence, type: e.target.value })}>
        <option value="none">None</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <button onClick={handleSubmit}>Save</button>
      {event && <button onClick={() => onDelete(event.id)}>Delete</button>}
      <button onClick={onClose}>Cancel</button>
    </Modal>
  );
}

export default EventForm;
