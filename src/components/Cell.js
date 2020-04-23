import React from 'react';

// COMPONENTS ===================================================
import CellNote from './CellNote';

const Cell = ({ date, dayOfWeek, events, selectDate }) => {
  return (
    <div
      className={`date ${
        (dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday') && 'weekend'
      }`}
      onClick={() => selectDate(date, dayOfWeek, events)}>
      {/* IF the date contains events (reservations) change date color */}
      <div className={`date-number ${events.length > 0 && 'attention'}`}>
        {date}
      </div>

      {/* IF the date contains events (reservations) show a list on the cell */}
      {events.length !== 0 &&
        events.map(event => (
          <CellNote
            key={event._id}
            name={event.name}
            pax={event.pax}
            table={event.table}
            arrival={event.arrival}
          />
        ))}
    </div>
  );
};

export default Cell;
