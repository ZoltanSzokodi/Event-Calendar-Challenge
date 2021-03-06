import React, { useState, useEffect } from 'react';

// COMPONENTS ===================================================
import Event from './Event';

// UTILITIES ====================================================
import ordinalSuffixOf from '../utils/ordinalSuffixOf';
import validateTime from '../utils/validateTime';
import sortByArrival from '../utils/sortByArrival';

// THIRD PARTY LIB ==============================================
import { v4 as uuidv4 } from 'uuid';
import { bounceInLeft } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

const styles = {
  bounceInLeft: {
    animation: 'x 1s',
    animationName: Radium.keyframes(bounceInLeft, 'bounceInLeft'),
  },
};

const ManageEvents = ({ dateSelect, unselectDate, dates, setDates }) => {
  const { date, dayOfWeek, events } = dateSelect;
  // COMPONENT STATE ============================================
  const [eventData, setEventData] = useState({
    date,
    name: '',
    pax: '',
    table: '',
    arrival: '',
  });
  // Form validation state
  const [validationErr, setValidationErr] = useState('');

  const { name, pax, table, arrival } = eventData;

  // Clear validation errors after 5s
  useEffect(() => {
    const timeout = setTimeout(() => {
      setValidationErr('');
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [validationErr]);

  // EVENT HANDLERS ============================================
  const handleChange = e =>
    setEventData({ ...eventData, [e.target.name]: e.target.value });

  const addEvent = e => {
    e.preventDefault();

    // Form validation
    if (name.length < 1) {
      return setValidationErr('Please enter guest name');
    }
    if (isNaN(parseInt(table))) {
      return setValidationErr('Please enter a valid table number');
    }
    if (isNaN(parseInt(pax))) {
      return setValidationErr('Please enter a valid number of guests');
    }
    if (!validateTime(arrival)) {
      return setValidationErr('Please enter a valid time (HH:MM)');
    }

    const datesArray = [...dates];

    datesArray.map(date => {
      if (date.date === eventData.date) {
        date.events.push({ ...eventData, _id: uuidv4() });
      }
    });

    // Save to local storage
    localStorage.setItem('dates', JSON.stringify(datesArray));
    setDates(datesArray);

    // After adding a new event (reservation) reset the state
    setEventData({
      ...eventData,
      name: '',
      pax: '',
      table: '',
      arrival: '',
    });
  };

  const removeEvent = id => {
    const datesArray = [...dates];

    datesArray.map(date => {
      if (date.date === eventData.date) {
        let index = date.events.indexOf(
          date.events.find(event => event._id === id)
        );
        date.events.splice(index, 1);
      }
    });

    // Save to local storage
    localStorage.setItem('dates', JSON.stringify(datesArray));
    setDates(datesArray);
  };

  // RENDER COMPONENT ==================================================
  return (
    <StyleRoot>
      <div style={styles.bounceInLeft} className='manage-events-container'>
        <div className='manage-events-header'>
          <h2>{`${dayOfWeek} the ${ordinalSuffixOf(date)} - ${
            events.length
          } reservation(s)`}</h2>
          <button className='close-btn' onClick={unselectDate}>
            <ion-icon name='close-outline' />
          </button>
        </div>

        <div className='error-container'>
          {!validationErr ? (
            <h3>
              Enter name, table number, number of people and arrival time
              (hh:mm)
            </h3>
          ) : (
            <h3 className='error-msg'>{validationErr}</h3>
          )}
        </div>

        <form className='manage-events-form'>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Name of guest...'
              name='name'
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Table No...'
              name='table'
              value={table}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Num of guests...'
              name='pax'
              value={pax}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Arrival...'
              name='arrival'
              value={arrival}
              onChange={handleChange}
            />
          </div>
          <button className='add-event-btn' onClick={addEvent}>
            add reservation
          </button>
        </form>

        {/* Render the events list */}
        <div className='manage-events-list'>
          {events.length !== 0 && <h3>DELETE RESERVATIONS (click)</h3>}
          {events.length !== 0 &&
            events
              .sort(sortByArrival)
              .map(event => (
                <Event
                  key={event._id}
                  event={event}
                  removeEvent={removeEvent}
                />
              ))}
        </div>

        <button className='go-back-btn' onClick={unselectDate}>
          <ion-icon name='arrow-back-outline' /> See all reservations
        </button>
      </div>
    </StyleRoot>
  );
};

export default ManageEvents;
