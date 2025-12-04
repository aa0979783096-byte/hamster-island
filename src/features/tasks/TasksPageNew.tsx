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
      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedDate
          ? 'minmax(0, 2fr) minmax(300px, 1fr)'
          : '1fr',
        gap: '1.5rem',
        alignItems: 'start',
      }}>
        {/* 左側：月曆 */}
        <Calendar
          tasks={state.tasks}
          selectedDate={selectedDate}
          onDateClick={handleDateClick}
        />

        {/* 右側：當日行程 */}
        {selectedDate && (
          <DayView
            date={selectedDate}
            tasks={state.tasks}
            onAddTask={handleAddNewTask}
            onTaskClick={handleEditTask}
            onToggleTask={toggleTask}
            onToggleSubTask={toggleSubTask}
          />
        )}
      </div>

      {/* 響應式樣式 */}
      <style>{`
        @media (max-width: 1024px) {
          /* 平板尺寸：改為單欄 */
          .tasks-page-grid {
            grid-template-columns: 1fr !important;
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
