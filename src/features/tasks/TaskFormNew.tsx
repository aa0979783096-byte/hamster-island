import { useState } from 'react';
import type { Task, TaskType, Difficulty, SubTask } from '../../types';
import { DIFFICULTY_CONFIG } from '../../utils/rewards';
import { COLOR_OPTIONS, DEFAULT_COLOR } from '../../utils/colors';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'completedSubTasks' | 'seedsEarned'>) => void;
  onCancel: () => void;
  initialTask?: Task;
  initialDate?: Date; // 預設日期
}

// 預設分類
const DEFAULT_CATEGORIES = ['學業', '健身', '工作', '自我提升'];

export const TaskFormNew = ({ onSubmit, onCancel, initialTask, initialDate }: TaskFormProps) => {
  const [type, setType] = useState<TaskType>(initialTask?.type || 'task');
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [difficulty, setDifficulty] = useState<Difficulty>(initialTask?.difficulty || 'normal');
  const [isAllDay, setIsAllDay] = useState(initialTask?.isAllDay || false);
  const [color, setColor] = useState(initialTask?.color || DEFAULT_COLOR);

  const [startTime, setStartTime] = useState(
    initialTask?.startTime ? formatDateTimeLocal(initialTask.startTime) :
    initialDate ? formatDateTimeLocal(initialDate) : ''
  );
  const [endTime, setEndTime] = useState(
    initialTask?.endTime ? formatDateTimeLocal(initialTask.endTime) : ''
  );
  const [category, setCategory] = useState(initialTask?.category || DEFAULT_CATEGORIES[0]);
  const [customCategory, setCustomCategory] = useState('');
  const [subTasks, setSubTasks] = useState<SubTask[]>(initialTask?.subTasks || []);
  const [newSubTask, setNewSubTask] = useState('');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleAddSubTask = () => {
    if (newSubTask.trim()) {
      setSubTasks([
        ...subTasks,
        {
          id: Date.now().toString(),
          title: newSubTask.trim(),
          completed: false,
        },
      ]);
      setNewSubTask('');
    }
  };

  const handleRemoveSubTask = (id: string) => {
    setSubTasks(subTasks.filter(st => st.id !== id));
  };

  // 拖曳處理
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newSubTasks = [...subTasks];
    const draggedItem = newSubTasks[draggedIndex];
    newSubTasks.splice(draggedIndex, 1);
    newSubTasks.splice(index, 0, draggedItem);

    setSubTasks(newSubTasks);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalCategory = customCategory.trim() || category;

    // 如果是全天行程，設定時間為當天的開始和結束
    let finalStartTime: Date;
    let finalEndTime: Date;

    if (isAllDay) {
      const date = startTime ? new Date(startTime) : new Date();
      finalStartTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
      finalEndTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
    } else {
      finalStartTime = new Date(startTime);
      finalEndTime = new Date(endTime);
    }

    onSubmit({
      type,
      title,
      description,
      difficulty,
      startTime: finalStartTime,
      endTime: finalEndTime,
      isAllDay,
      category: finalCategory,
      color,
      subTasks,
      completed: false,
    });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <form onSubmit={handleSubmit} style={{
        background: 'white',
        padding: 'clamp(1rem, 4vw, 2rem)',
        borderRadius: '12px',
        maxWidth: '600px',
        width: 'clamp(90%, 95vw, 95%)',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        boxSizing: 'border-box',
      }}>
        <h2 style={{ marginTop: 0, color: '#FF9E5E', fontSize: 'clamp(1.3rem, 4vw, 1.75rem)' }}>
          {initialTask ? '編輯行程' : '新增行程'}
        </h2>

        {/* 任務類型 - Segmented Control */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            行程類型
          </label>
          <div style={{
            display: 'flex',
            background: '#f0f0f0',
            borderRadius: '8px',
            padding: '0.25rem',
          }}>
            <button
              type="button"
              onClick={() => setType('task')}
              style={{
                flex: 1,
                padding: 'clamp(0.5rem, 2vw, 0.75rem)',
                border: 'none',
                borderRadius: '6px',
                background: type === 'task' ? '#FF9E5E' : 'transparent',
                color: type === 'task' ? 'white' : '#666',
                fontWeight: type === 'task' ? 'bold' : 'normal',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
              }}
            >
              📋 任務
            </button>
            <button
              type="button"
              onClick={() => setType('challenge')}
              style={{
                flex: 1,
                padding: 'clamp(0.5rem, 2vw, 0.75rem)',
                border: 'none',
                borderRadius: '6px',
                background: type === 'challenge' ? '#FF9E5E' : 'transparent',
                color: type === 'challenge' ? 'white' : '#666',
                fontWeight: type === 'challenge' ? 'bold' : 'normal',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
              }}
            >
              🏆 個人挑戰
            </button>
          </div>
        </div>

        {/* 任務名稱 */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            行程名稱 *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="例如：寫企劃書、背單字、讀30頁書"
            style={inputStyle}
            required
          />
        </div>

        {/* 描述 */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            描述
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="行程詳細說明（選填）"
            style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
          />
        </div>

        {/* 難度 */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            難度
          </label>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {(Object.keys(DIFFICULTY_CONFIG) as Difficulty[]).map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => setDifficulty(diff)}
                style={{
                  padding: '0.5rem 1rem',
                  border: difficulty === diff ? '3px solid #FF9E5E' : '2px solid #ddd',
                  borderRadius: '8px',
                  background: difficulty === diff ? DIFFICULTY_CONFIG[diff].color : 'white',
                  color: difficulty === diff ? 'white' : '#333',
                  fontWeight: difficulty === diff ? 'bold' : 'normal',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {DIFFICULTY_CONFIG[diff].label} ({DIFFICULTY_CONFIG[diff].energy} ⚡)
              </button>
            ))}
          </div>
        </div>

        {/* 顏色標籤 */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            顏色標籤
          </label>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {COLOR_OPTIONS.map((colorOption) => (
              <button
                key={colorOption.id}
                type="button"
                onClick={() => setColor(colorOption.value)}
                style={{
                  width: '40px',
                  height: '40px',
                  border: color === colorOption.value ? '3px solid #FF9E5E' : '2px solid #ddd',
                  borderRadius: '8px',
                  background: colorOption.value,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  position: 'relative',
                }}
                title={colorOption.name}
              >
                {color === colorOption.value && (
                  <span style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'white',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                  }}>
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 全天行程選項 */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            padding: '0.75rem',
            background: '#FFF4E6',
            borderRadius: '8px',
          }}>
            <input
              type="checkbox"
              checked={isAllDay}
              onChange={(e) => setIsAllDay(e.target.checked)}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
            <span style={{ fontWeight: 'bold' }}>全天行程</span>
          </label>
        </div>

        {/* 時間 */}
        {isAllDay ? (
          // 全天行程只需選擇日期
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              日期 *
            </label>
            <input
              type="date"
              value={startTime.split('T')[0]}
              onChange={(e) => setStartTime(e.target.value + 'T00:00')}
              style={inputStyle}
              required
            />
          </div>
        ) : (
          // 非全天行程需選擇開始和結束時間
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                開始時間 *
              </label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                style={inputStyle}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                結束時間 *
              </label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                style={inputStyle}
                required
              />
            </div>
          </div>
        )}

        {/* 分類 */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            分類
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={inputStyle}
          >
            {DEFAULT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="text"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            placeholder="或輸入自訂分類"
            style={{ ...inputStyle, marginTop: '0.5rem' }}
          />
        </div>

        {/* 子任務 - 可拖曳排序 */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            代辦清單
          </label>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <input
              type="text"
              value={newSubTask}
              onChange={(e) => setNewSubTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSubTask())}
              placeholder="輸入代辦事項"
              style={{ ...inputStyle, margin: 0, flex: 1 }}
            />
            <button
              type="button"
              onClick={handleAddSubTask}
              style={{
                padding: '0.5rem 1rem',
                background: '#FF9E5E',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              新增
            </button>
          </div>
          {subTasks.length > 0 && (
            <div style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '0.5rem',
              maxHeight: '200px',
              overflow: 'auto',
            }}>
              {subTasks.map((st, index) => (
                <div
                  key={st.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem',
                    borderBottom: index < subTasks.length - 1 ? '1px solid #eee' : 'none',
                    background: draggedIndex === index ? '#FFF4E6' : 'white',
                    cursor: 'move',
                    transition: 'background 0.2s',
                  }}
                >
                  <span style={{ color: '#999', cursor: 'grab' }}>☰</span>
                  <span style={{ flex: 1 }}>{st.title}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSubTask(st.id)}
                    style={{
                      background: '#ff6b6b',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '0.25rem 0.5rem',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                    }}
                  >
                    刪除
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 按鈕 */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <button
            type="submit"
            style={{
              flex: 1,
              padding: '0.75rem',
              background: '#FF9E5E',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem',
            }}
          >
            {initialTask ? '儲存' : '建立行程'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{
              flex: 1,
              padding: '0.75rem',
              background: '#ddd',
              color: '#333',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem',
            }}
          >
            取消
          </button>
        </div>
      </form>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: 'clamp(0.4rem, 1.5vw, 0.5rem)',
  border: '2px solid #ddd',
  borderRadius: '8px',
  fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
  boxSizing: 'border-box',
};

// 輔助函數：將 Date 轉換為 datetime-local 格式
function formatDateTimeLocal(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
