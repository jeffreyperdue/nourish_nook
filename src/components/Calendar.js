// src/components/Calendar.js
import React, { useState, useEffect } from 'react';
import './Calendar.css';

const Calendar = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthsOfYear = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getCurrentESTDate = () => {
    const currentDate = new Date();
    const offset = currentDate.getTimezoneOffset() * 60000;
    const utcTime = currentDate.getTime() + offset;
    const estTime = utcTime + (-5 * 3600000); // -5 hours for EST (without considering daylight saving)
    return new Date(estTime);
  };

  const [currentDate, setCurrentDate] = useState(getCurrentESTDate());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const currentYear = currentDate.getFullYear();
  const today = currentDate.getDate();

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(selectedMonth, currentYear);
  const firstDayOfMonth = new Date(currentYear, selectedMonth, 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = getCurrentESTDate();
      if (now.getDate() !== currentDate.getDate()) {
        setCurrentDate(now);
      }
    }, 60000); // Check every minute

    return () => clearInterval(timer);
  }, [currentDate]);

  const handleMonthClick = (monthIndex) => {
    setSelectedMonth(monthIndex);
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="day-of-week">{day}</div>
        ))}
      </div>
      <div className="calendar-body">
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={index} className="empty-day"></div>
        ))}
        {days.map((day) => (
          <div
            key={day}
            className={`day ${day === today && selectedMonth === currentDate.getMonth() ? 'current-day' : ''}`}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-footer">
        {monthsOfYear.slice(0, 6).map((month, index) => (
          <div
            key={index}
            className={`month ${index === selectedMonth ? 'current-month' : ''}`}
            onClick={() => handleMonthClick(index)}
          >
            {month}
          </div>
        ))}
      </div>
      <div className="calendar-footer">
        {monthsOfYear.slice(6, 12).map((month, index) => (
          <div
            key={index + 6}
            className={`month ${index + 6 === selectedMonth ? 'current-month' : ''}`}
            onClick={() => handleMonthClick(index + 6)}
          >
            {month}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
