import React, { useState, useEffect } from 'react';
import ordinalSuffixOf from '../utils/ordinalSuffixOf';
import validateTime from '../utils/validateTime';
import { v4 as uuidv4 } from 'uuid';

const ManageEvents = ({ dateSelect, unselectDate, dates, setDates }) => {
  const [eventData, setEventData] = useState({
    date: dateSelect.date,
    title: '',
    description: '',
    begin: '',
    end: '',
  });
  const [validationErr, setValidationErr] = useState('');

  const { title, description, begin, end } = eventData;

  useEffect(() => {
    setTimeout(() => {
      setValidationErr('');
    }, 5000);
  }, [validationErr]);

  const handleChange = e =>
    setEventData({ ...eventData, [e.target.name]: e.target.value });

  const addEvent = e => {
    e.preventDefault();
    if (eventData.title.length > 20 || eventData.title.length < 1) {
      return setValidationErr('Title must be beween 1 and 20 characters');
    }
    if (
      eventData.description.length > 100 ||
      eventData.description.length < 10
    ) {
      return setValidationErr(
        'Description must be beween 10 and 100 characters'
      );
    }
    if (!validateTime(eventData.begin) || !validateTime(eventData.end)) {
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

  const removeEvent = e => {
    const datesArray = [...dates];
    datesArray.map(date => {
      if (date.date === eventData.date) {
        // date.events.filter(event => event._id !== e.target.id);
        let index = date.events.indexOf(
          date.events.find(event => event._id === e.target.id)
        );
        date.events.splice(index, 1);
      }
    });
    setDates(datesArray);
    // console.log(datesArray);
  };

  // console.log(dates.events);

  return (
    <div className='manage-events-container'>
      <div className='manage-events-header'>
        <div>Manage Events</div>
        <p>{`${dateSelect.dayOfWeek} the ${ordinalSuffixOf(
          dateSelect.date
        )} - ${dateSelect.events.length} events`}</p>
        <button onClick={unselectDate}>X</button>
      </div>

      <form className='form'>
        {validationErr && <div>{validationErr}</div>}
        <div className='form-group'>
          <input
            type='text'
            placeholder='Title'
            name='title'
            value={title}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Description'
            name='description'
            value={description}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='tetx'
            placeholder='Begin'
            name='begin'
            value={begin}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='End'
            name='end'
            value={end}
            onChange={handleChange}
          />
        </div>
        <button onClick={addEvent}>add event</button>
      </form>
      <div>
        {dateSelect.events.length !== 0 &&
          dateSelect.events.map(event => (
            <span key={event._id} id={event._id} onClick={removeEvent}>
              {event.title}
            </span>
          ))}
      </div>
    </div>
  );
};

export default ManageEvents;
