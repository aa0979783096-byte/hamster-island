import type { Task } from '../../types';
import { formatDateShort } from '../../utils/calendar';
import { getTasksForDay, sortTasksForDay } from '../../utils/taskSort';
import { DIFFICULTY_CONFIG } from '../../utils/rewards';
import { formatTime } from '../../utils/date';

interface DayViewProps {
  date: Date;
  tasks: Task[];
  onAddTask: () => void;
  onTaskClick: (task: Task) => void;
  onToggleTask: (taskId: string) => void;
  onToggleSubTask: (taskId: string, subTaskId: string) => void;
}

export const DayView = ({
  date,
  tasks,
  onAddTask,
  onTaskClick,
  onToggleTask,
  onToggleSubTask,
}: DayViewProps) => {
  const dayTasks = sortTasksForDay(getTasksForDay(tasks, date));

  const allDayTasks = dayTasks.filter(t => t.isAllDay);
  const timedTasks = dayTasks.filter(t => !t.isAllDay);

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: 'clamp(1rem, 3vw, 1.5rem)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      {/* 標題 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: '2px solid #FFE4CC',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}>
        <div>
          <h3 style={{ margin: 0, color: '#FF9E5E', fontSize: 'clamp(1.1rem, 3vw, 1.3rem)' }}>
            {formatDateShort(date)}
          </h3>
          <p style={{ margin: '0.25rem 0 0 0', color: '#666', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>
            共 {dayTasks.length} 個行程
          </p>
        </div>
        <button
          onClick={onAddTask}
          style={{
            padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.5rem)',
            background: '#FF9E5E',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
            boxShadow: '0 2px 8px rgba(255,158,94,0.3)',
            whiteSpace: 'nowrap',
          }}
        >
          ➕ 新增行程
        </button>
      </div>

      {/* 無行程提示 */}
      {dayTasks.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '3rem 1rem',
          color: '#999',
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📅</div>
          <p style={{ fontSize: '1.1rem', margin: '0.5rem 0' }}>目前還沒有行程喔</p>
          <p style={{ fontSize: '0.9rem', color: '#bbb' }}>點擊「新增行程」開始規劃您的一天</p>
        </div>
      )}

      {/* 全天行程 */}
      {allDayTasks.length > 0 && (
        <div style={{ marginBottom: timedTasks.length > 0 ? '2rem' : 0 }}>
          <h4 style={{
            margin: '0 0 1rem 0',
            color: '#666',
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
            全天行程
          </h4>
          {allDayTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => onTaskClick(task)}
              onToggle={() => onToggleTask(task.id)}
              onToggleSubTask={(subTaskId) => onToggleSubTask(task.id, subTaskId)}
            />
          ))}
        </div>
      )}

      {/* 時間行程 */}
      {timedTasks.length > 0 && (
        <div>
          <h4 style={{
            margin: '0 0 1rem 0',
            color: '#666',
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
            行程安排
          </h4>
          {timedTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => onTaskClick(task)}
              onToggle={() => onToggleTask(task.id)}
              onToggleSubTask={(subTaskId) => onToggleSubTask(task.id, subTaskId)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface TaskCardProps {
  task: Task;
  onClick: () => void;
  onToggle: () => void;
  onToggleSubTask: (subTaskId: string) => void;
}

const TaskCard = ({ task, onClick, onToggle, onToggleSubTask }: TaskCardProps) => {
  const diffConfig = DIFFICULTY_CONFIG[task.difficulty];
  const completionPercentage = task.subTasks.length > 0
    ? Math.round((task.completedSubTasks / task.subTasks.length) * 100)
    : 0;

  return (
    <div style={{
      background: task.completed ? '#f9f9f9' : '#FFFAF0',
      border: `2px solid ${task.completed ? '#90EE90' : '#FFE4CC'}`,
      borderRadius: '12px',
      padding: 'clamp(0.75rem, 2vw, 1rem)',
      marginBottom: '1rem',
      opacity: task.completed ? 0.7 : 1,
      transition: 'all 0.2s',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {/* 勾選框 */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
          style={{
            width: '20px',
            height: '20px',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        />

        {/* 內容區 */}
        <div style={{ flex: 1, cursor: 'pointer' }} onClick={onClick}>
          {/* 標題與標籤 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
            {!task.isAllDay && (
              <span style={{
                color: '#FF9E5E',
                fontWeight: 'bold',
                fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
              }}>
                {formatTime(task.startTime)}
              </span>
            )}
            <h4 style={{
              margin: 0,
              textDecoration: task.completed ? 'line-through' : 'none',
              fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
            }}>
              {task.title}
            </h4>
            <span style={{
              background: task.type === 'challenge' ? '#FFD700' : '#87CEEB',
              color: 'white',
              padding: '0.2rem 0.5rem',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 'bold',
            }}>
              {task.type === 'challenge' ? '🏆' : '📋'}
            </span>
            <span style={{
              background: diffConfig.color,
              color: 'white',
              padding: '0.2rem 0.5rem',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 'bold',
            }}>
              {diffConfig.label}
            </span>
          </div>

          {/* 時間範圍（非全天） */}
          {!task.isAllDay && (
            <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>
              {formatTime(task.startTime)} - {formatTime(task.endTime)}
            </div>
          )}

          {/* 子任務進度 */}
          {task.subTasks.length > 0 && (
            <div style={{ marginTop: '0.75rem' }}>
              <div style={{
                background: '#e0e0e0',
                borderRadius: '8px',
                height: '6px',
                overflow: 'hidden',
                marginBottom: '0.5rem',
              }}>
                <div style={{
                  background: '#FF9E5E',
                  height: '100%',
                  width: `${completionPercentage}%`,
                  transition: 'width 0.3s',
                }} />
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: '#666',
                display: 'flex',
                justifyContent: 'space-between',
              }}>
                <span>子任務進度</span>
                <span>{task.completedSubTasks}/{task.subTasks.length} ({completionPercentage}%)</span>
              </div>

              {/* 子任務列表 */}
              <div style={{ marginTop: '0.5rem' }}>
                {task.subTasks.slice(0, 3).map(subTask => (
                  <div
                    key={subTask.id}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.25rem 0',
                      fontSize: '0.85rem',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={subTask.completed}
                      onChange={() => onToggleSubTask(subTask.id)}
                      disabled={task.completed}
                      style={{ cursor: task.completed ? 'not-allowed' : 'pointer' }}
                    />
                    <span style={{
                      textDecoration: subTask.completed ? 'line-through' : 'none',
                      color: subTask.completed ? '#999' : '#333',
                    }}>
                      {subTask.title}
                    </span>
                  </div>
                ))}
                {task.subTasks.length > 3 && (
                  <div style={{ fontSize: '0.75rem', color: '#999', marginTop: '0.25rem' }}>
                    還有 {task.subTasks.length - 3} 項...
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 完成獎勵 */}
          {task.completed && task.seedsEarned > 0 && (
            <div style={{
              marginTop: '0.75rem',
              color: '#FFD700',
              fontWeight: 'bold',
              fontSize: '0.9rem',
            }}>
              🌻 獲得 {task.seedsEarned} 瓜子！
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
