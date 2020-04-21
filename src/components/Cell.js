import React from 'react';

const Cell = ({ date, dayOfWeek, events, selectDate }) => {
  return (
    <div className='date' onClick={() => selectDate(date, dayOfWeek, events)}>
      {date}
      {events.length !== 0 && events.map(event => <span>{event.title}</span>)}
    </div>
  );
};

export default Cell;
