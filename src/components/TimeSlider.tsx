import { useState, useRef, useEffect } from 'react';

interface TimeSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  unit?: string;
}

export const TimeSlider = ({
  label,
  value,
  min,
  max,
  onChange,
  disabled = false,
  unit = '分鐘',
}: TimeSliderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // 計算滑桿位置百分比
  const percentage = ((value - min) / (max - min)) * 100;

  // 處理滑鼠/觸控事件
  const handleMove = (clientX: number) => {
    if (!sliderRef.current || disabled) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const newValue = Math.round((percent / 100) * (max - min) + min);

    onChange(newValue);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled) return;
    setIsDragging(true);
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        handleMove(e.touches[0].clientX);
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging]);

  return (
    <div style={{
      marginBottom: '1.5rem',
      opacity: disabled ? 0.5 : 1,
      pointerEvents: disabled ? 'none' : 'auto',
    }}>
      {/* 標籤 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.75rem',
      }}>
        <label style={{
          fontWeight: 'bold',
          color: '#333',
          fontSize: '0.95rem',
        }}>
          {label}
        </label>
        <span style={{
          fontSize: '0.875rem',
          color: '#666',
        }}>
          {min} - {max} {unit}
        </span>
      </div>

      {/* 滑桿容器 */}
      <div style={{ position: 'relative', paddingTop: '2rem' }}>
        {/* 數字氣泡 */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: `calc(${percentage}% - 30px)`,
          width: '60px',
          height: '36px',
          background: '#FF9E5E',
          borderRadius: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1rem',
          boxShadow: '0 2px 8px rgba(255, 158, 94, 0.4)',
          transition: isDragging ? 'none' : 'left 0.15s ease-out',
          zIndex: 10,
        }}>
          {value}
          {/* 小三角形 */}
          <div style={{
            position: 'absolute',
            bottom: '-6px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '6px solid #FF9E5E',
          }} />
        </div>

        {/* 滑桿軌道 */}
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          style={{
            position: 'relative',
            width: '100%',
            height: '12px',
            background: '#f0f0f0',
            borderRadius: '6px',
            cursor: disabled ? 'not-allowed' : 'pointer',
            overflow: 'visible',
          }}
        >
          {/* 已填充部分 */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: `${percentage}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #FFB84D 0%, #FF9E5E 100%)',
            borderRadius: '6px',
            transition: isDragging ? 'none' : 'width 0.15s ease-out',
          }} />

          {/* 滑動按鈕 */}
          <div
            style={{
              position: 'absolute',
              left: `calc(${percentage}% - 14px)`,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '28px',
              height: '28px',
              background: 'white',
              borderRadius: '50%',
              border: '3px solid #FF9E5E',
              boxShadow: isDragging
                ? '0 4px 12px rgba(255, 158, 94, 0.5)'
                : '0 2px 8px rgba(255, 158, 94, 0.3)',
              cursor: disabled ? 'not-allowed' : isDragging ? 'grabbing' : 'grab',
              transition: isDragging ? 'none' : 'left 0.15s ease-out, box-shadow 0.2s',
              zIndex: 5,
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              if (!disabled) {
                setIsDragging(true);
              }
            }}
          >
            {/* 倉鼠圖案 */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '0.875rem',
            }}>
              🐹
            </div>
          </div>
        </div>

        {/* 刻度標記 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '0.5rem',
          paddingLeft: '4px',
          paddingRight: '4px',
        }}>
          <span style={{ fontSize: '0.75rem', color: '#999' }}>{min}</span>
          <span style={{ fontSize: '0.75rem', color: '#999' }}>{max}</span>
        </div>
      </div>
    </div>
  );
};
