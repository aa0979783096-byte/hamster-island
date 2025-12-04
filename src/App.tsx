import { useState } from 'react'
import { Layout } from './components/Layout'
import { ErrorBoundary } from './components/ErrorBoundary'
import { AppProvider } from './stores/AppContext'
import { TasksPageNew } from './features/tasks/TasksPageNew'
import { PomodoroPage } from './features/pomodoro/PomodoroPage'
import { MapPage } from './features/map/MapPage'

function App() {
  const [activeTab, setActiveTab] = useState<'pomodoro' | 'tasks' | 'map'>('pomodoro');

  return (
    <ErrorBoundary>
      <AppProvider>
        <Layout activeTab={activeTab} onTabChange={setActiveTab}>
          <ErrorBoundary>
            {activeTab === 'pomodoro' && <PomodoroPage />}
            {activeTab === 'tasks' && <TasksPageNew />}
            {activeTab === 'map' && <MapPage />}
          </ErrorBoundary>
        </Layout>
      </AppProvider>
    </ErrorBoundary>
  )
}

export default App
