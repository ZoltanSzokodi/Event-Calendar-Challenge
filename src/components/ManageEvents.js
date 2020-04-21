import React, { useState } from 'react';
import ordinalSuffixOf from '../utils/ordinalSuffixOf';
import { v4 as uuidv4 } from 'uuid';

const ManageEvents = ({ dateSelect, unselectDate }) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    begin: '',
    end: '',
  });

  const { title, description, begin, end } = eventData;

  const handleChange = e =>
    setEventData({ ...eventData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    console.log({ ...eventData, id: uuidv4(), date: dateSelect.date });
  };

  return (
    <div className='manage-events-container'>
      <div className='manage-events-header'>
        <div>Manage Events</div>
        <p>{`${dateSelect.dayOfWeek} the ${ordinalSuffixOf(
          dateSelect.date
        )} - ${dateSelect.events.length} events`}</p>
        <button onClick={unselectDate}>X</button>
      </div>

      <form className='form' onSubmit={handleSubmit}>
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
        <input type='submit' className='btn' />
      </form>
    </div>
  );
};

export default ManageEvents;
