import { useState } from 'react';
import type { Task } from '../../types';
import { useApp } from '../../stores/AppContext';
import { Calendar } from './Calendar';
import { DayView } from './DayView';
import { TaskFormNew } from './TaskFormNew';

export const TasksPageNew = () => {
  const { state, addTask, updateTask, toggleTask, toggleSubTask } = useApp();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleAddTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'completedSubTasks' | 'seedsEarned'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      completedSubTasks: 0,
      seedsEarned: 0,
    };
    addTask(newTask);
    setShowForm(false);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleUpdateTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'completedSubTasks' | 'seedsEarned'>) => {
    if (editingTask) {
      updateTask(editingTask.id, {
        ...taskData,
        completedSubTasks: editingTask.completedSubTasks,
        seedsEarned: editingTask.seedsEarned,
      });
      setShowForm(false);
      setEditingTask(undefined);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(undefined);
  };

  const handleAddNewTask = () => {
    setEditingTask(undefined);
    setShowForm(true);
  };

  return (
    <div>
      {/* 頁面標題 */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ margin: 0, color: '#FF9E5E', fontSize: '1.8rem' }}>
          📅 行事曆
        </h2>
        <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>
          點擊日期查看當天行程，管理您的任務與挑戰
        </p>
      </div>

      {/* 主要內容區 - 響應式雙欄布局 */}
      <div className="calendar-container">
        {/* 左側：月曆 */}
        <div className="calendar">
          <Calendar
            tasks={state.tasks}
            selectedDate={selectedDate}
            onDateClick={handleDateClick}
          />
        </div>

        {/* 右側：當日行程面板 */}
        {selectedDate && (
          <div className="schedule-panel">
            <DayView
              date={selectedDate}
              tasks={state.tasks}
              onAddTask={handleAddNewTask}
              onTaskClick={handleEditTask}
              onToggleTask={toggleTask}
              onToggleSubTask={toggleSubTask}
            />
          </div>
        )}
      </div>

      {/* 響應式樣式 */}
      <style>{`
        /* 預設布局（大螢幕 >960px）：併排，右側固定寬度 */
        .calendar-container {
          display: flex;
          gap: 1.5rem;
          align-items: start;
        }

        .calendar {
          flex: 1;
          min-width: 0; /* 防止 flex item 溢出 */
        }

        .schedule-panel {
          width: 360px;
          flex-shrink: 0;
        }

        /* 中螢幕（600px - 960px）：仍併排，但採彈性布局 */
        @media (max-width: 960px) and (min-width: 601px) {
          .schedule-panel {
            width: 320px; /* 稍微縮小以適應中螢幕 */
          }
        }

        /* 小螢幕（<600px）：改為上下排列 */
        @media (max-width: 600px) {
          .calendar-container {
            flex-direction: column; /* 改成上下排列 */
          }

          .calendar {
            order: 1; /* 月曆優先顯示在上方 */
            width: 100%;
          }

          .schedule-panel {
            order: 2; /* 行程面板在月曆下方 */
            width: 100%; /* 改成全寬 */
          }
        }
      `}</style>

      {/* 任務表單（彈出視窗） */}
      {showForm && (
        <TaskFormNew
          onSubmit={editingTask ? handleUpdateTask : handleAddTask}
          onCancel={handleCancelForm}
          initialTask={editingTask}
          initialDate={selectedDate}
        />
      )}
    </div>
  );
};
