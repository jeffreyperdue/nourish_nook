// src/components/Calendar.js
import React, { useState, useEffect } from 'react';
import './Calendar.css';
import { useUser } from '../contexts/UserContext'; // Import useUser hook

const Calendar = () => {
  const { user } = useUser(); // Get user data from context
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentDate, setCurrentDate] = useState(new Date().getDate());
  const [flippedDates, setFlippedDates] = useState({});
  const [dayNumberData, setDayNumberData] = useState({});

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const handleMonthClick = (month) => {
    setCurrentMonth(month);
    if (month !== new Date().getMonth() || currentYear !== new Date().getFullYear()) {
      setCurrentDate(null);
    } else {
      setCurrentDate(new Date().getDate());
    }
  };

  const handleDateClick = (day) => {
    setFlippedDates(prevState => ({
      ...prevState,
      [day]: !prevState[day]
    }));

    // Fetch or update `day_number` for the clicked day based on the user
    if (user) {
      // Example: Fetch day number data for the user
      // Replace this with actual data fetching logic
      const dayNumber = getUserLoggedData(user.id, day);
      setDayNumberData(prevData => ({
        ...prevData,
        [day]: dayNumber
      }));
    }
  };

  const renderDaysOfWeek = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return daysOfWeek.map((day, index) => (
      <div key={index} className="day-of-week">{day}</div>
    ));
  };

  const renderDays = () => {
    const days = [];
    const daysInCurrentMonth = daysInMonth(currentMonth, currentYear);
    const firstDay = firstDayOfMonth(currentMonth, currentYear);

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }

    for (let day = 1; day <= daysInCurrentMonth; day++) {
      const isCurrentDay =
        day === currentDate &&
        currentMonth === new Date().getMonth() &&
        currentYear === new Date().getFullYear();

      const isFlipped = flippedDates[day];

      days.push(
        <div
          key={day}
          className={`day ${isCurrentDay ? 'current-day' : ''} ${isFlipped ? 'flipped' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          <div className="day-front">{day}</div>
          <div className="day-back">
            {dayNumberData[day] ? (
              <div className="day-number-container">
                <img src="/images/calendar_flower.png" alt="Flower" className="flower-image" />
                <div className="day-number">{dayNumberData[day]}</div>
              </div>
            ) : (
              `Notes for ${day}`
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const renderMonths = () => {
    return monthNames.map((month, index) => (
      <div
        key={index}
        className={`month ${index === currentMonth ? 'current-month' : ''}`}
        onClick={() => handleMonthClick(index)}
      >
        {month}
      </div>
    ));
  };

  return (
    <div className="wall-calendar">
      <div className="month-image">
        <img src={`/images/${monthNames[currentMonth].toLowerCase()}.jpg`} alt={monthNames[currentMonth]} />
      </div>
      <div className="calendar">
        <div className="calendar-header">
          {renderDaysOfWeek()}
        </div>
        <div className="calendar-body">
          {renderDays()}
        </div>
        <div className="calendar-footer">
          {renderMonths()}
        </div>
      </div>
    </div>
  );
};

export default Calendar;

const getUserLoggedData = (userId, day) => {
  // This function should return the total number of fruits and vegetables
  // logged by the user on the given day. Replace with actual data fetching logic.
  // For now, let's return a dummy number.
  return Math.floor(Math.random() * 10) + 1;
};
