import React from 'react';

const CellNote = ({ name, pax, table, arrival }) => {
  return (
    <div className='cell-note'>
      {arrival} | {name} | pax: {pax} | table: {table}
    </div>
  );
};

export default CellNote;
