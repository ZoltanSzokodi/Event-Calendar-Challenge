import React from 'react';

const Event = ({ event, removeEvent }) => {
  const { _id, arrival, name, pax, table } = event;

  return (
    <div className='event' onClick={() => removeEvent(_id)} key={_id}>
      <div>Arrival: {arrival}</div>
      <div>Name: {name}</div>
      <div>Pax: {pax}</div>
      <div>Table: {table}</div>
    </div>
  );
};

export default Event;
