import React, { useState, useEffect } from 'react';
// import { v4 as uuidv4 } from 'uuid';
import Cell from './components/Cell';
import ManageEvents from './components/ManageEvents';
// import ordinalSuffixOf from './utils/ordinalSuffixOf';
import './App.css';

const dayNames = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const App = () => {
  // COMPONENT STATE ============================================
  const [dates, setDates] = useState([]);
  const [dateSelect, setDateSelect] = useState({
    isSelected: false,
    date: '',
    dayOfWeek: '',
    events: [],
  });

  useEffect(() => {
    const datesArray = [];
    let dayNamesIndex = 0;

    for (let date = 1; date <= 30; date++) {
      if (dayNamesIndex > 6) dayNamesIndex = 0;

      datesArray.push({
        date,
        dayOfWeek: dayNames[dayNamesIndex],
        events: [],
      });
      dayNamesIndex++;
    }
    setDates(datesArray);
  }, []);
  // console.log(dates);
  // console.log(dateSelect);

  // EVENT HANDLERS =============================================
  const selectDate = (date, dayOfWeek, events) => {
    setDateSelect({
      ...dateSelect,
      isSelected: true,
      date,
      dayOfWeek,
      events,
    });
  };

  const unselectDate = () => {
    setDateSelect({
      ...dateSelect,
      isSelected: false,
      date: '',
      dayOfWeek: '',
      events: [],
    });
  };

  // RENDER COMPONENT ==========================================
  return (
    <div className='wrapper'>
      {dateSelect.isSelected ? (
        <ManageEvents
          dateSelect={dateSelect}
          unselectDate={unselectDate}
          dates={dates}
          setDates={setDates}
        />
      ) : (
        <div className='calendar'>
          <div className='calendar-header'>Please Select a Date</div>
          {dayNames.map(dayName => (
            <div className='day-name' key={dayName}>
              {dayName}
            </div>
          ))}
          {dates.map(date => (
            <Cell
              key={date.date}
              date={date.date}
              dayOfWeek={date.dayOfWeek}
              events={date.events}
              selectDate={selectDate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
