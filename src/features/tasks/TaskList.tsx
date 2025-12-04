import { useState } from 'react';
import type { Task } from '../../types';
import { DIFFICULTY_CONFIG } from '../../utils/rewards';
import { formatDateTime } from '../../utils/date';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onToggleSubTask: (taskId: string, subTaskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
}

export const TaskList = ({
  tasks,
  onToggleTask,
  onToggleSubTask,
  onDeleteTask,
  onEditTask,
}: TaskListProps) => {
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  if (tasks.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '3rem',
        color: '#999',
      }}>
        <p style={{ fontSize: '1.2rem' }}>🐹 還沒有任務喔！</p>
        <p>點擊「➕ 新增任務」開始建立您的第一個任務</p>
      </div>
    );
  }

  // 分組：未完成 vs 已完成
  const incompleteTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div>
      {/* 進行中的任務 */}
      {incompleteTasks.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#FF9E5E', marginBottom: '1rem' }}>
            🔥 進行中 ({incompleteTasks.length})
          </h3>
          {incompleteTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              expanded={expandedTaskId === task.id}
              onToggleExpand={() => setExpandedTaskId(
                expandedTaskId === task.id ? null : task.id
              )}
              onToggleTask={onToggleTask}
              onToggleSubTask={onToggleSubTask}
              onDelete={onDeleteTask}
              onEdit={onEditTask}
            />
          ))}
        </div>
      )}

      {/* 已完成的任務 */}
      {completedTasks.length > 0 && (
        <div>
          <h3 style={{ color: '#90EE90', marginBottom: '1rem' }}>
            ✅ 已完成 ({completedTasks.length})
          </h3>
          {completedTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              expanded={expandedTaskId === task.id}
              onToggleExpand={() => setExpandedTaskId(
                expandedTaskId === task.id ? null : task.id
              )}
              onToggleTask={onToggleTask}
              onToggleSubTask={onToggleSubTask}
              onDelete={onDeleteTask}
              onEdit={onEditTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface TaskItemProps {
  task: Task;
  expanded: boolean;
  onToggleExpand: () => void;
  onToggleTask: (taskId: string) => void;
  onToggleSubTask: (taskId: string, subTaskId: string) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
}

const TaskItem = ({
  task,
  expanded,
  onToggleExpand,
  onToggleTask,
  onToggleSubTask,
  onDelete,
  onEdit,
}: TaskItemProps) => {
  const diffConfig = DIFFICULTY_CONFIG[task.difficulty];
  const completionPercentage = task.subTasks.length > 0
    ? Math.round((task.completedSubTasks / task.subTasks.length) * 100)
    : 0;

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '1rem',
      marginBottom: '1rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: task.completed ? '2px solid #90EE90' : '2px solid #FFE4CC',
      opacity: task.completed ? 0.7 : 1,
    }}>
      {/* 任務主要資訊 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* 完成勾選框 */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleTask(task.id)}
          style={{
            width: '24px',
            height: '24px',
            cursor: 'pointer',
          }}
        />

        {/* 任務內容 */}
        <div style={{ flex: 1, cursor: 'pointer' }} onClick={onToggleExpand}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <h4 style={{
              margin: 0,
              textDecoration: task.completed ? 'line-through' : 'none',
            }}>
              {task.title}
            </h4>

            {/* 類型標籤 */}
            <span style={{
              background: task.type === 'challenge' ? '#FFD700' : '#87CEEB',
              color: 'white',
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 'bold',
            }}>
              {task.type === 'challenge' ? '🏆 挑戰' : '📋 任務'}
            </span>

            {/* 難度標籤 */}
            <span style={{
              background: diffConfig.color,
              color: 'white',
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 'bold',
            }}>
              {diffConfig.label} {diffConfig.energy}⚡
            </span>

            {/* 分類標籤 */}
            <span style={{
              background: '#E8E8E8',
              color: '#555',
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              fontSize: '0.75rem',
            }}>
              {task.category}
            </span>
          </div>

          {/* 時間資訊 */}
          <div style={{
            fontSize: '0.875rem',
            color: '#666',
            marginTop: '0.25rem',
          }}>
            {formatDateTime(task.startTime)} - {formatDateTime(task.endTime)}
          </div>

          {/* 完成度進度條 */}
          {task.subTasks.length > 0 && (
            <div style={{ marginTop: '0.5rem' }}>
              <div style={{
                background: '#f0f0f0',
                borderRadius: '8px',
                height: '8px',
                overflow: 'hidden',
              }}>
                <div style={{
                  background: '#FF9E5E',
                  height: '100%',
                  width: `${completionPercentage}%`,
                  transition: 'width 0.3s',
                }} />
              </div>
              <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>
                子任務進度: {task.completedSubTasks}/{task.subTasks.length} ({completionPercentage}%)
              </div>
            </div>
          )}

          {/* 獲得的瓜子 */}
          {task.completed && task.seedsEarned > 0 && (
            <div style={{
              marginTop: '0.5rem',
              color: '#FFD700',
              fontWeight: 'bold',
            }}>
              🌻 獲得 {task.seedsEarned} 瓜子！
            </div>
          )}
        </div>

        {/* 操作按鈕 */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            style={{
              padding: '0.5rem 1rem',
              background: '#4A90E2',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
          >
            編輯
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm('確定要刪除這個任務嗎？')) {
                onDelete(task.id);
              }
            }}
            style={{
              padding: '0.5rem 1rem',
              background: '#ff6b6b',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
          >
            刪除
          </button>
        </div>
      </div>

      {/* 展開的子任務和描述 */}
      {expanded && (
        <div style={{
          marginTop: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid #eee',
        }}>
          {/* 描述 */}
          {task.description && (
            <div style={{ marginBottom: '1rem' }}>
              <strong>描述：</strong>
              <p style={{ margin: '0.5rem 0', color: '#666' }}>{task.description}</p>
            </div>
          )}

          {/* 子任務列表 */}
          {task.subTasks.length > 0 && (
            <div>
              <strong>子任務：</strong>
              <div style={{ marginTop: '0.5rem' }}>
                {task.subTasks.map(subTask => (
                  <div
                    key={subTask.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem',
                      background: '#f9f9f9',
                      borderRadius: '6px',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={subTask.completed}
                      onChange={() => onToggleSubTask(task.id, subTask.id)}
                      disabled={task.completed}
                      style={{ cursor: task.completed ? 'not-allowed' : 'pointer' }}
                    />
                    <span style={{
                      textDecoration: subTask.completed ? 'line-through' : 'none',
                      color: subTask.completed ? '#999' : '#333',
                    }}>
                      {subTask.title}
                    </span>
                    {subTask.completed && (
                      <span style={{ color: '#FFD700', fontSize: '0.875rem' }}>
                        +5🌻
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
