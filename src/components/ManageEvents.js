import React, { useState, useEffect } from 'react';
import ordinalSuffixOf from '../utils/ordinalSuffixOf';
import validateTime from '../utils/validateTime';
import { v4 as uuidv4 } from 'uuid';

const ManageEvents = ({ dateSelect, unselectDate, dates, setDates }) => {
  const [eventData, setEventData] = useState({
    date: dateSelect.date,
    name: '',
    pax: '',
    table: '',
    arrival: '',
  });
  const [validationErr, setValidationErr] = useState('');

  const { name, pax, table, arrival } = eventData;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValidationErr('');
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [validationErr]);

  const handleChange = e =>
    setEventData({ ...eventData, [e.target.name]: e.target.value });

  const addEvent = e => {
    e.preventDefault();
    if (eventData.name.length > 20 || eventData.name.length < 1) {
      return setValidationErr('Please enter guest name');
    }
    if (isNaN(parseInt(eventData.table))) {
      return setValidationErr('Please enter a valid table number');
    }
    if (isNaN(parseInt(eventData.pax))) {
      return setValidationErr('Please enter a valid number of guests');
    }
    if (!validateTime(eventData.arrival)) {
      return setValidationErr('Please enter a valid time (HH:MM)');
    }

    const datesArray = [...dates];

    datesArray.map(date => {
      if (date.date === eventData.date) {
        date.events.push({ ...eventData, _id: uuidv4() });
      }
    });

    setDates(datesArray);
  };

  const removeEvent = id => {
    const datesArray = [...dates];
    console.log(id);
    datesArray.map(date => {
      if (date.date === eventData.date) {
        // date.events.filter(event => event._id !== e.target.id);
        let index = date.events.indexOf(
          date.events.find(event => event._id === id)
        );
        date.events.splice(index, 1);
      }
    });
    setDates(datesArray);
  };

  return (
    <div className='manage-events-container'>
      <div className='manage-events-header'>
        <h2>{`${dateSelect.dayOfWeek} the ${ordinalSuffixOf(
          dateSelect.date
        )} - ${dateSelect.events.length} events`}</h2>
        <button className='close-btn' onClick={unselectDate}>
          X
        </button>
      </div>

      <div className='error-container'>
        {!validationErr ? (
          <h3>Add a new event</h3>
        ) : (
          <h3 className='error-msg'>{validationErr}</h3>
        )}
      </div>

      <form className='manage-events-form'>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name of guest'
            name='name'
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Table No'
            name='table'
            value={table}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Num of guests'
            name='pax'
            value={pax}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Arrival'
            name='arrival'
            value={arrival}
            onChange={handleChange}
          />
        </div>
        <button className='add-event-btn' onClick={addEvent}>
          add event
        </button>
      </form>

      <div className='manage-events-list'>
        {dateSelect.events.length !== 0 &&
          dateSelect.events.map(event => (
            <div
              className='event'
              onClick={() => removeEvent(event._id)}
              key={event._id}
              id={event._id}>
              <div>Arrival: {event.arrival}</div>
              <div>Name: {event.name}</div>
              <div>Pax: {event.pax}</div>
              <div>Table: {event.table}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ManageEvents;
