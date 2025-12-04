import { useState } from 'react'
import { Layout } from './components/Layout'
import { AppProvider } from './stores/AppContext'
import { TasksPageNew } from './features/tasks/TasksPageNew'
import { PomodoroPage } from './features/pomodoro/PomodoroPage'
import { MapPage } from './features/map/MapPage'

function App() {
  const [activeTab, setActiveTab] = useState<'pomodoro' | 'tasks' | 'map'>('pomodoro');

  return (
    <AppProvider>
      <Layout activeTab={activeTab} onTabChange={setActiveTab}>
        {activeTab === 'pomodoro' && <PomodoroPage />}
        {activeTab === 'tasks' && <TasksPageNew />}
        {activeTab === 'map' && <MapPage />}
      </Layout>
    </AppProvider>
  )
}

export default App
