import React from 'react';
import CellNote from './CellNote';

const Cell = ({ date, dayOfWeek, events, selectDate }) => {
  return (
    <div className='date' onClick={() => selectDate(date, dayOfWeek, events)}>
      <div className='date-number'>{date}</div>

      {events.length !== 0 &&
        events.map(event => (
          <CellNote
            key={event._id}
            title={event.title}
            begin={event.begin}
            end={event.end}
          />
        ))}
    </div>
  );
};

export default Cell;
