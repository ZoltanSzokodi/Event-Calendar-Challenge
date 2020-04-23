import React from 'react';
import { flipInX } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

const styles = {
  flipInX: {
    animation: 'x 1s',
    animationName: Radium.keyframes(flipInX, 'flipInX'),
  },
};

const Event = ({ event, removeEvent }) => {
  const { _id, arrival, name, pax, table } = event;

  return (
    <StyleRoot>
      <div
        className='event'
        style={styles.flipInX}
        onClick={() => removeEvent(_id)}
        key={_id}>
        <div>Arrival: {arrival}</div>
        <div>Name: {name}</div>
        <div>Pax: {pax}</div>
        <div>Table: {table}</div>
      </div>
    </StyleRoot>
  );
};

export default Event;
