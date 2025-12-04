import { useState, useEffect, useRef } from 'react';
import type { PomodoroSettings } from '../../types';
import { useApp } from '../../stores/AppContext';
import { TimeSlider } from '../../components/TimeSlider';

export const PomodoroPage = () => {
  const { state } = useApp();

  // 預設設定
  const [settings, setSettings] = useState<PomodoroSettings>({
    mode: 'focus',
    focusMinutes: 25,
    breakMinutes: 5,
    autoStartBreak: false,
    autoStartNextPomodoro: false,
    soundEnabled: true,
    animationEnabled: true,
  });

  // 計時器狀態
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentType, setCurrentType] = useState<'work' | 'break'>('work');
  const [timeLeft, setTimeLeft] = useState(settings.focusMinutes * 60); // 秒
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  // 設定面板狀態
  const [showSettings, setShowSettings] = useState(false);

  // 完成動畫狀態
  const [showCompletion, setShowCompletion] = useState(false);
  const [coinsEarned, setCoinsEarned] = useState(0);

  const intervalRef = useRef<number | null>(null);

  // 開始計時
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      setIsPaused(false);
    }
  };

  // 暫停計時（僅悠閒模式）
  const pauseTimer = () => {
    if (settings.mode === 'relax') {
      setIsPaused(true);
    }
  };

  // 繼續計時
  const resumeTimer = () => {
    setIsPaused(false);
  };

  // 停止計時
  const stopTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    // 重置時間
    setTimeLeft(currentType === 'work' ? settings.focusMinutes * 60 : settings.breakMinutes * 60);
  };

  // 完成當前番茄鐘
  const completePomodoro = () => {
    // 計算獎勵
    const coins = currentType === 'work'
      ? (settings.mode === 'focus' ? 8 : 3)
      : 0;

    setCoinsEarned(coins);

    // 顯示完成動畫
    if (settings.animationEnabled) {
      setShowCompletion(true);
      setTimeout(() => setShowCompletion(false), 3000);
    }

    // 播放音效
    if (settings.soundEnabled) {
      playCompletionSound();
    }

    // 切換工作/休息
    if (currentType === 'work') {
      setCurrentType('break');
      setTimeLeft(settings.breakMinutes * 60);

      // 自動開始休息
      if (settings.autoStartBreak) {
        setIsRunning(true);
      } else {
        setIsRunning(false);
      }
    } else {
      setCurrentType('work');
      setTimeLeft(settings.focusMinutes * 60);

      // 自動開始下一輪
      if (settings.autoStartNextPomodoro) {
        setIsRunning(true);
      } else {
        setIsRunning(false);
      }
    }
  };

  // 播放完成音效
  const playCompletionSound = () => {
    // 簡單的音效實現
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    gainNode.gain.value = 0.3;

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
  };

  // 計時器邏輯
  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            completePomodoro();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused]);

  // 格式化時間顯示
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 切換模式
  const toggleMode = () => {
    if (!isRunning) {
      const newMode = settings.mode === 'focus' ? 'relax' : 'focus';
      setSettings({ ...settings, mode: newMode });
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem',
      maxWidth: '600px',
      margin: '0 auto',
    }}>
      <h2 style={{ color: '#FF9E5E', marginBottom: '2rem' }}>🍅 倉鼠島番茄鐘</h2>

      {/* 倉鼠角色 */}
      <div style={{
        fontSize: '4rem',
        marginBottom: '1rem',
        animation: isRunning ? 'bounce 2s infinite' : 'none',
      }}>
        🐹
      </div>

      {/* 模式切換 */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        <button
          onClick={toggleMode}
          disabled={isRunning}
          style={{
            padding: '0.5rem 1.5rem',
            background: settings.mode === 'focus' ? '#FF9E5E' : '#ddd',
            color: settings.mode === 'focus' ? 'white' : '#666',
            border: 'none',
            borderRadius: '8px',
            cursor: isRunning ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            opacity: isRunning ? 0.6 : 1,
          }}
        >
          🎯 專注模式
        </button>
        <button
          onClick={toggleMode}
          disabled={isRunning}
          style={{
            padding: '0.5rem 1.5rem',
            background: settings.mode === 'relax' ? '#FF9E5E' : '#ddd',
            color: settings.mode === 'relax' ? 'white' : '#666',
            border: 'none',
            borderRadius: '8px',
            cursor: isRunning ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            opacity: isRunning ? 0.6 : 1,
          }}
        >
          🌸 悠閒模式
        </button>
      </div>

      {/* 當前類型 */}
      <div style={{
        fontSize: '1.2rem',
        color: '#666',
        marginBottom: '1rem',
      }}>
        {currentType === 'work' ? '⏰ 專注時間' : '☕ 休息時間'}
      </div>

      {/* 倒數計時器 */}
      <div style={{
        fontSize: '5rem',
        fontWeight: 'bold',
        color: currentType === 'work' ? '#FF9E5E' : '#50C878',
        marginBottom: '2rem',
        fontFamily: 'monospace',
      }}>
        {formatTime(timeLeft)}
      </div>

      {/* 控制按鈕 */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        {!isRunning || isPaused ? (
          <button
            onClick={isPaused ? resumeTimer : startTimer}
            style={{
              padding: '1rem 2rem',
              background: '#50C878',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}
          >
            {isPaused ? '▶️ 繼續' : '▶️ 開始'}
          </button>
        ) : (
          <>
            {settings.mode === 'relax' && (
              <button
                onClick={pauseTimer}
                style={{
                  padding: '1rem 2rem',
                  background: '#FFD93D',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                }}
              >
                ⏸️ 暫停
              </button>
            )}
          </>
        )}

        {(isRunning || isPaused) && (
          <button
            onClick={stopTimer}
            style={{
              padding: '1rem 2rem',
              background: '#FF6B6B',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}
          >
            ⏹️ 停止
          </button>
        )}
      </div>

      {/* 設定按鈕 */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        disabled={isRunning}
        style={{
          padding: '0.75rem 1.5rem',
          background: 'white',
          color: '#FF9E5E',
          border: '2px solid #FF9E5E',
          borderRadius: '8px',
          cursor: isRunning ? 'not-allowed' : 'pointer',
          fontWeight: 'bold',
          opacity: isRunning ? 0.6 : 1,
        }}
      >
        ⚙️ 設定
      </button>

      {/* 設定面板 */}
      {showSettings && (
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          width: '100%',
        }}>
          <h3 style={{ marginTop: 0, color: '#FF9E5E' }}>⚙️ 番茄鐘設定</h3>

          {/* 專注時間滑桿 */}
          <TimeSlider
            label="⏰ 專注時間"
            value={settings.focusMinutes}
            min={5}
            max={120}
            onChange={(value) => {
              setSettings({ ...settings, focusMinutes: value });
              if (currentType === 'work' && !isRunning) {
                setTimeLeft(value * 60);
              }
            }}
            disabled={isRunning}
          />

          {/* 休息時間滑桿 */}
          <TimeSlider
            label="☕ 休息時間"
            value={settings.breakMinutes}
            min={1}
            max={30}
            onChange={(value) => {
              setSettings({ ...settings, breakMinutes: value });
              if (currentType === 'break' && !isRunning) {
                setTimeLeft(value * 60);
              }
            }}
            disabled={isRunning}
          />

          {/* 綁定任務 */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              綁定任務（選填）
            </label>
            <select
              value={selectedTaskId || ''}
              onChange={(e) => setSelectedTaskId(e.target.value || null)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '2px solid #ddd',
                borderRadius: '8px',
                fontSize: '1rem',
              }}
            >
              <option value="">無（不綁定任務）</option>
              {state.tasks.filter(t => !t.completed).map((task) => (
                <option key={task.id} value={task.id}>
                  {task.title}
                </option>
              ))}
            </select>
          </div>

          {/* 選項 */}
          <div style={{ marginBottom: '0.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.autoStartBreak}
                onChange={(e) => setSettings({ ...settings, autoStartBreak: e.target.checked })}
              />
              <span>自動開始休息</span>
            </label>
          </div>

          <div style={{ marginBottom: '0.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.autoStartNextPomodoro}
                onChange={(e) => setSettings({ ...settings, autoStartNextPomodoro: e.target.checked })}
              />
              <span>自動開始下一輪</span>
            </label>
          </div>

          <div style={{ marginBottom: '0.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) => setSettings({ ...settings, soundEnabled: e.target.checked })}
              />
              <span>啟用音效</span>
            </label>
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.animationEnabled}
                onChange={(e) => setSettings({ ...settings, animationEnabled: e.target.checked })}
              />
              <span>啟用完成動畫</span>
            </label>
          </div>
        </div>
      )}

      {/* 完成動畫 */}
      {showCompletion && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          animation: 'fadeIn 0.3s',
        }}>
          <div style={{
            fontSize: '8rem',
            animation: 'bounce 0.5s infinite',
          }}>
            🐹🌻
          </div>
          <h2 style={{
            color: 'white',
            fontSize: '2.5rem',
            marginTop: '2rem',
          }}>
            🎉 完成！
          </h2>
          <p style={{
            color: 'white',
            fontSize: '1.5rem',
            marginTop: '1rem',
          }}>
            獲得 {coinsEarned} 片瓜子！
          </p>
          {selectedTaskId && (
            <p style={{
              color: '#FFD93D',
              fontSize: '1.2rem',
              marginTop: '0.5rem',
            }}>
              任務：{state.tasks.find(t => t.id === selectedTaskId)?.title}
            </p>
          )}
        </div>
      )}

      {/* CSS 動畫 */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};
