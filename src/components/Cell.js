import React from 'react';

const Cell = ({ date, dayOfWeek }) => {
  return (
    <div onClick={() => console.log(dayOfWeek)} className='date'>
      {date}
    </div>
  );
};

export default Cell;
