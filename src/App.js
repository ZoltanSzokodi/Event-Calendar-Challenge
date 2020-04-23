import React, { useState, useEffect } from 'react';

// COMPONENTS ===================================================
import ManageEvents from './components/ManageEvents';
import Cell from './components/Cell';

// UTILITIES ====================================================
import dayNames from './utils/dayNames';

// THIRD PARTY LIB ==============================================
import { bounceInLeft } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

import './App.css';

const styles = {
  bounceInLeft: {
    animation: 'x 1s',
    animationName: Radium.keyframes(bounceInLeft, 'bounceInLeft'),
  },
};

const App = () => {
  // COMPONENT STATE ============================================
  const [dates, setDates] = useState([]);
  const [dateSelect, setDateSelect] = useState({
    isSelected: false,
    date: '',
    dayOfWeek: '',
    events: [],
  });

  // On component did mount populate the 'dates' state
  useEffect(() => {
    // Check local storage for saved data
    if (localStorage.dates) {
      setDates(JSON.parse(localStorage.getItem('dates')));
      // Create calendar grid
    } else {
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
    }
  }, []);

  // EVENT HANDLERS =============================================
  // Select a specific date
  const selectDate = (date, dayOfWeek, events) => {
    setDateSelect({
      ...dateSelect,
      isSelected: true,
      date,
      dayOfWeek,
      events,
    });
  };

  // Un-select date
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
      {/* IF there is a selected date, render the <ManageEvents /> component with the specific data - ELSE render the callendar */}
      {dateSelect.isSelected ? (
        <ManageEvents
          dateSelect={dateSelect}
          unselectDate={unselectDate}
          dates={dates}
          setDates={setDates}
        />
      ) : (
        <StyleRoot>
          <div style={styles.bounceInLeft} className='calendar'>
            <div className='calendar-header'>Restaurant Reservations</div>
            {dayNames.map(dayName => (
              <div className='day-name' key={dayName}>
                {dayName}
              </div>
            ))}
            {dates.map(date => (
              // Individual cells with their unique data
              <Cell
                key={date.date}
                date={date.date}
                dayOfWeek={date.dayOfWeek}
                events={date.events}
                selectDate={selectDate}
              />
            ))}
          </div>
        </StyleRoot>
      )}
    </div>
  );
};

export default App;
