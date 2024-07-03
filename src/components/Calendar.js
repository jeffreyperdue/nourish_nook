// src/components/Calendar.js
import React, { useState, useEffect } from 'react';
import './Calendar.css';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentDate, setCurrentDate] = useState(new Date().getDate());
  const [flippedDates, setFlippedDates] = useState({});

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const handleMonthClick = (month) => {
    setCurrentMonth(month);
    setCurrentDate(null); // Clear the current date to avoid incorrect highlighting
  };

  const handleDateClick = (day) => {
    setFlippedDates(prevState => ({
      ...prevState,
      [day]: !prevState[day]
    }));
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
          <div className="day-back">Notes for {day}</div>
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
