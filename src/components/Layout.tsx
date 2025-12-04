import type { ReactNode } from 'react';
import { useApp } from '../stores/AppContext';

interface LayoutProps {
  children: ReactNode;
  activeTab: 'pomodoro' | 'tasks' | 'map';
  onTabChange: (tab: 'pomodoro' | 'tasks' | 'map') => void;
}

export const Layout = ({ children, activeTab, onTabChange }: LayoutProps) => {
  const { state } = useApp();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100vw',
      overflow: 'auto',
    }}>
      {/* 標題列 */}
      <header style={{
        padding: 'clamp(0.75rem, 2vw, 1rem)',
        background: '#FF9E5E',
        color: 'white',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        flexShrink: 0,
      }}>
        <h1 style={{ margin: 0, fontSize: 'clamp(1.3rem, 4vw, 1.75rem)' }}>🐹 倉鼠島生產力工具</h1>
      </header>

      {/* 導航標籤 */}
      <nav style={{
        display: 'flex',
        gap: 'clamp(0.25rem, 1vw, 0.5rem)',
        padding: 'clamp(0.5rem, 2vw, 1rem)',
        background: '#FFF4E6',
        borderBottom: '2px solid #FF9E5E',
        overflowX: 'auto',
        flexWrap: 'nowrap',
        flexShrink: 0,
      }}>
        <TabButton
          active={activeTab === 'pomodoro'}
          onClick={() => onTabChange('pomodoro')}
        >
          🏠 首頁
        </TabButton>
        <TabButton
          active={activeTab === 'tasks'}
          onClick={() => onTabChange('tasks')}
        >
          📅 行事曆
        </TabButton>
        <TabButton
          active={activeTab === 'map'}
          onClick={() => onTabChange('map')}
        >
          🗺️ 地圖
        </TabButton>
      </nav>

      {/* 主要內容區 */}
      <main style={{
        flex: 1,
        width: '100%',
        padding: 'clamp(1rem, 3vw, 2rem)',
        overflowY: 'auto',
        overflowX: 'hidden',
        background: '#FFFAF0',
        boxSizing: 'border-box',
        WebkitOverflowScrolling: 'touch',
      }}>
        {children}
      </main>

      {/* 頁尾統計 */}
      <footer style={{
        padding: 'clamp(0.5rem, 2vw, 1rem)',
        background: '#FFF4E6',
        borderTop: '2px solid #FF9E5E',
        textAlign: 'center'
      }}>
        <p style={{
          margin: 0,
          color: '#666',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 'clamp(0.5rem, 2vw, 2rem)',
          flexWrap: 'wrap',
          fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
        }}>
          <span style={{ whiteSpace: 'nowrap' }}>🐹 {state.hamsterProfile.name}</span>
          <span style={{ whiteSpace: 'nowrap' }}>等級 {state.hamsterProfile.level}</span>
          <span style={{ whiteSpace: 'nowrap' }}>經驗值 {state.hamsterProfile.experience}</span>
          <span style={{ whiteSpace: 'nowrap' }}>🌻 {state.hamsterProfile.coins} 瓜子</span>
          <span style={{ whiteSpace: 'nowrap' }}>✅ {state.stats.totalTasksCompleted} 任務完成</span>
        </p>
      </footer>
    </div>
  );
};

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}

const TabButton = ({ active, onClick, children }: TabButtonProps) => (
  <button
    onClick={onClick}
    style={{
      padding: 'clamp(0.4rem, 1.5vw, 0.5rem) clamp(0.75rem, 2vw, 1rem)',
      border: 'none',
      borderRadius: '8px',
      background: active ? '#FF9E5E' : 'white',
      color: active ? 'white' : '#333',
      cursor: 'pointer',
      fontWeight: active ? 'bold' : 'normal',
      transition: 'all 0.2s',
      boxShadow: active ? '0 2px 8px rgba(255,158,94,0.3)' : '0 1px 3px rgba(0,0,0,0.1)',
      fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
      whiteSpace: 'nowrap',
      flexShrink: 0,
    }}
  >
    {children}
  </button>
);
