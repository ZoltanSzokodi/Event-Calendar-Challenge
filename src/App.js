import React from 'react';
// import { v4 as uuidv4 } from 'uuid';
import Cell from './components/Cell';
import './App.css';

const App = () => {
  // const renderDayNames = () => {
  //   const dayNames = [
  //     'Monday',
  //     'Tuesday',
  //     'Wednesday',
  //     'Thursday',
  //     'Friday',
  //     'Saturday',
  //     'Sunday',
  //   ];
  //   return dayNames.map(dayName => (
  //     <Cell key={dayName} cellClass='day-name' cellContent={dayName} />
  //   ));
  // };

  const dayNames = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const renderDays = () => {
    const dates = [];
    let dayNamesIndex = 0;

    for (let date = 1; date <= 30; date++) {
      if (dayNamesIndex > 6) dayNamesIndex = 0;

      dates.push(
        <Cell key={date} date={date} dayOfWeek={dayNames[dayNamesIndex]} />
      );

      dayNamesIndex++;
    }
    return dates.map(day => day);
  };

  return (
    <div className='wrapper'>
      <div className='calendar'>
        <div className='calendar-header'>HEADER</div>
        {dayNames.map(dayName => (
          <div className='day-name' key={dayName}>
            {dayName}
          </div>
        ))}
        {renderDays()}
      </div>
    </div>
  );
};

export default App;
