import { useState } from 'react'
import { Layout } from './components/Layout'
import { AppProvider } from './stores/AppContext'
import { TasksPageNew } from './features/tasks/TasksPageNew'
import { PomodoroPage } from './features/pomodoro/PomodoroPage'

function App() {
  const [activeTab, setActiveTab] = useState<'tasks' | 'habits' | 'timer' | 'pomodoro' | 'hamster'>('tasks');

  return (
    <AppProvider>
      <Layout activeTab={activeTab} onTabChange={setActiveTab}>
        {activeTab === 'tasks' && <TasksPageNew />}
        {activeTab === 'habits' && <PlaceholderPage title="習慣追蹤" icon="⭐" />}
        {activeTab === 'timer' && <PlaceholderPage title="時間追蹤" icon="⏱️" />}
        {activeTab === 'pomodoro' && <PomodoroPage />}
        {activeTab === 'hamster' && <PlaceholderPage title="我的倉鼠島" icon="🏝️" />}
      </Layout>
    </AppProvider>
  )
}

// 佔位頁面
const PlaceholderPage = ({ title, icon }: { title: string; icon: string }) => (
  <div style={{ textAlign: 'center', marginTop: '4rem' }}>
    <h2 style={{ fontSize: '2rem', color: '#FF9E5E' }}>{icon} {title}</h2>
    <p style={{ color: '#666', fontSize: '1.2rem' }}>此功能即將推出...</p>
    <div style={{
      marginTop: '2rem',
      padding: '2rem',
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      maxWidth: '500px',
      margin: '2rem auto',
    }}>
      <p>🐹 敬請期待</p>
    </div>
  </div>
);

export default App
