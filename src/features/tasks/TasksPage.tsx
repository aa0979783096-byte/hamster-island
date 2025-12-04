import { useState } from 'react';
import type { Task } from '../../types';
import { useApp } from '../../stores/AppContext';
import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';

export const TasksPage = () => {
  const { state, addTask, updateTask, deleteTask, toggleTask, toggleSubTask } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

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

  return (
    <div>
      {/* 頁面標題與新增按鈕 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
      }}>
        <div>
          <h2 style={{ margin: 0, color: '#FF9E5E' }}>任務管理</h2>
          <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>
            管理您的任務與挑戰，完成後獲得瓜子獎勵！
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          style={{
            padding: '1rem 2rem',
            background: '#FF9E5E',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(255,158,94,0.3)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(255,158,94,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,158,94,0.3)';
          }}
        >
          ➕ 新增任務
        </button>
      </div>

      {/* 統計資訊 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        <StatCard
          icon="📋"
          label="總任務數"
          value={state.tasks.length}
          color="#4A90E2"
        />
        <StatCard
          icon="✅"
          label="已完成"
          value={state.tasks.filter(t => t.completed).length}
          color="#90EE90"
        />
        <StatCard
          icon="🔥"
          label="進行中"
          value={state.tasks.filter(t => !t.completed).length}
          color="#FF9E5E"
        />
        <StatCard
          icon="🌻"
          label="累積瓜子"
          value={state.tasks.reduce((sum, t) => sum + t.seedsEarned, 0)}
          color="#FFD700"
        />
      </div>

      {/* 任務列表 */}
      <TaskList
        tasks={state.tasks}
        onToggleTask={toggleTask}
        onToggleSubTask={toggleSubTask}
        onDeleteTask={deleteTask}
        onEditTask={handleEditTask}
      />

      {/* 任務表單（彈出視窗） */}
      {showForm && (
        <TaskForm
          onSubmit={editingTask ? handleUpdateTask : handleAddTask}
          onCancel={handleCancelForm}
          initialTask={editingTask}
        />
      )}
    </div>
  );
};

interface StatCardProps {
  icon: string;
  label: string;
  value: number;
  color: string;
}

const StatCard = ({ icon, label, value, color }: StatCardProps) => (
  <div style={{
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    borderLeft: `4px solid ${color}`,
  }}>
    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>
    <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.25rem' }}>
      {label}
    </div>
    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color }}>
      {value}
    </div>
  </div>
);
