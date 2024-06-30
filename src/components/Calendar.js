// src/components/Calendar.js
import React from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isToday } from 'date-fns';
import './Calendar.css';

const Calendar = ({ logs }) => {
  const today = new Date();
  const start = startOfMonth(today);
  const end = endOfMonth(today);
  const days = eachDayOfInterval({ start, end });

  return (
    <div className="calendar-container">
      {days.map((day) => {
        const dayLogs = logs[format(day, 'yyyy-MM-dd')] || 0;
        const isCurrentDay = isToday(day);
        
        return (
          <div key={format(day, 'yyyy-MM-dd')} className={`calendar-day ${isCurrentDay ? 'current-day' : ''}`}>
            {dayLogs > 0 && (
              <>
                <img src="/images/mario_flower.png" alt="flower" className="flower-img" />
                <span className="flower-number">{dayLogs}</span>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Calendar;
