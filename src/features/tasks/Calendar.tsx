import { useState } from 'react';
import type { Task } from '../../types';
import { getCalendarDays, getMonthName } from '../../utils/calendar';
import { getTasksForDay, sortTasksForDay } from '../../utils/taskSort';

interface CalendarProps {
  tasks: Task[];
  selectedDate: Date | null;
  onDateClick: (date: Date) => void;
}

export const Calendar = ({ tasks, selectedDate, onDateClick }: CalendarProps) => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const calendarDays = getCalendarDays(currentYear, currentMonth);
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
    onDateClick(today);
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: 'clamp(1rem, 3vw, 1.5rem)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      {/* 月份導航 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}>
        <button
          onClick={handlePrevMonth}
          style={{
            padding: 'clamp(0.4rem, 2vw, 0.5rem) clamp(0.8rem, 3vw, 1rem)',
            background: '#FFF4E6',
            border: '2px solid #FF9E5E',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
            fontWeight: 'bold',
            color: '#FF9E5E',
            whiteSpace: 'nowrap',
          }}
        >
          ◀ 上個月
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.5rem, 2vw, 1rem)', flexWrap: 'wrap', justifyContent: 'center' }}>
          <h3 style={{ margin: 0, fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', color: '#FF9E5E', whiteSpace: 'nowrap' }}>
            {currentYear} 年 {getMonthName(currentMonth)}
          </h3>
          <button
            onClick={handleToday}
            style={{
              padding: 'clamp(0.4rem, 2vw, 0.5rem) clamp(0.8rem, 3vw, 1rem)',
              background: '#FF9E5E',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              color: 'white',
              fontWeight: 'bold',
              fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
              whiteSpace: 'nowrap',
            }}
          >
            今天
          </button>
        </div>

        <button
          onClick={handleNextMonth}
          style={{
            padding: 'clamp(0.4rem, 2vw, 0.5rem) clamp(0.8rem, 3vw, 1rem)',
            background: '#FFF4E6',
            border: '2px solid #FF9E5E',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
            fontWeight: 'bold',
            color: '#FF9E5E',
            whiteSpace: 'nowrap',
          }}
        >
          下個月 ▶
        </button>
      </div>

      {/* 星期標題 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: 'clamp(0.25rem, 1vw, 0.5rem)',
        marginBottom: '0.5rem',
      }}>
        {weekDays.map((day, index) => (
          <div
            key={day}
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              padding: 'clamp(0.25rem, 1vw, 0.5rem)',
              color: index === 0 ? '#ff6b6b' : index === 6 ? '#4A90E2' : '#666',
              fontSize: 'clamp(0.75rem, 2vw, 1rem)',
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 日期格子 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: 'clamp(0.25rem, 1vw, 0.5rem)',
      }}>
        {calendarDays.map((day, index) => {
          const dayTasks = sortTasksForDay(getTasksForDay(tasks, day.date));
          const isSelected = selectedDate &&
            day.date.getFullYear() === selectedDate.getFullYear() &&
            day.date.getMonth() === selectedDate.getMonth() &&
            day.date.getDate() === selectedDate.getDate();

          return (
            <div
              key={index}
              onClick={() => onDateClick(day.date)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                padding: '0.5rem',
                borderRadius: '8px',
                cursor: 'pointer',
                background: isSelected
                  ? '#FFF4E6'
                  : day.isToday
                  ? '#FFE4CC'
                  : day.isCurrentMonth
                  ? 'white'
                  : '#f9f9f9',
                border: day.isToday && !isSelected
                  ? '2px solid #FF9E5E'
                  : isSelected
                  ? '2px solid #FF9E5E'
                  : '1px solid #eee',
                transition: 'all 0.2s',
                minHeight: '100px',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.background = '#FFF4E6';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.background = day.isToday
                    ? '#FFE4CC'
                    : day.isCurrentMonth
                    ? 'white'
                    : '#f9f9f9';
                }
              }}
            >
              {/* 日期數字 - 左上角 */}
              <div style={{
                fontSize: '0.9rem',
                fontWeight: day.isToday || isSelected ? 'bold' : 'normal',
                color: day.isCurrentMonth
                  ? day.isWeekend
                    ? day.date.getDay() === 0 ? '#ff6b6b' : '#4A90E2'
                    : '#333'
                  : '#ccc',
                marginBottom: '0.25rem',
              }}>
                {day.date.getDate()}
              </div>

              {/* 行程列表 */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
              }}>
                {dayTasks.map((task) => (
                  <div
                    key={task.id}
                    style={{
                      background: task.color,
                      color: 'white',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      opacity: task.completed ? 0.5 : 1,
                      textDecoration: task.completed ? 'line-through' : 'none',
                    }}
                    title={task.title} // 完整名稱作為 tooltip
                  >
                    {task.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
