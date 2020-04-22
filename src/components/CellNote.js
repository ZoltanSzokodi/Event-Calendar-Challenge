import React from 'react';

const CellNote = ({ title, begin, end }) => {
  return (
    <div className='cell-note'>
      {begin} - {end}: {title}
    </div>
  );
};

export default CellNote;
