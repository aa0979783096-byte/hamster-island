import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Task, PomodoroSession, HamsterProfile, Stats } from '../types';
import { storage } from '../utils/storage';
import { calculateSeeds, calculateExp } from '../utils/rewards';
import { DEFAULT_COLOR } from '../utils/colors';

interface AppState {
  tasks: Task[];
  pomodoroSessions: PomodoroSession[];
  hamsterProfile: HamsterProfile;
  stats: Stats;
}

interface AppContextType {
  state: AppState;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  toggleSubTask: (taskId: string, subTaskId: string) => void;
  startPomodoro: (session: Omit<PomodoroSession, 'id' | 'endTime' | 'completed'>) => void;
  completePomodoro: (id: string) => void;
  updateHamsterProfile: (updates: Partial<HamsterProfile>) => void;
}

// 遷移函數：為舊的任務資料補上預設顏色
const migrateTasks = (tasks: Task[]): Task[] => {
  return tasks.map(task => ({
    ...task,
    color: task.color || DEFAULT_COLOR, // 如果沒有顏色欄位，使用預設顏色
  }));
};

const initialState: AppState = {
  tasks: migrateTasks(storage.get<Task[]>('tasks') || []),
  pomodoroSessions: storage.get<PomodoroSession[]>('pomodoroSessions') || [],
  hamsterProfile: storage.get<HamsterProfile>('hamsterProfile') || {
    name: '我的倉鼠',
    level: 1,
    experience: 0,
    coins: 0,
    items: [],
  },
  stats: storage.get<Stats>('stats') || {
    totalTasksCompleted: 0,
    totalTimeTracked: 0,
    currentStreak: 0,
    longestStreak: 0,
    pomodorosCompleted: 0,
  },
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>(initialState);

  const updateAndSave = <K extends keyof AppState>(key: K, value: AppState[K]) => {
    setState(prev => ({ ...prev, [key]: value }));
    storage.set(key, value);
  };

  const addTask = (task: Task) => {
    const newTasks = [...state.tasks, task];
    updateAndSave('tasks', newTasks);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    const newTasks = state.tasks.map(task =>
      task.id === id ? { ...task, ...updates } : task
    );
    updateAndSave('tasks', newTasks);
  };

  const deleteTask = (id: string) => {
    const newTasks = state.tasks.filter(task => task.id !== id);
    updateAndSave('tasks', newTasks);
  };

  const toggleTask = (id: string) => {
    const newTasks = state.tasks.map(task => {
      if (task.id === id) {
        const newCompleted = !task.completed;

        // 如果是完成任務，計算瓜子獎勵
        if (newCompleted) {
          const seeds = calculateSeeds(task.difficulty, task.completedSubTasks, task.subTasks.length);
          const exp = calculateExp(task.difficulty, task.completedSubTasks, task.subTasks.length);

          // 更新倉鼠資料和統計
          const newProfile = {
            ...state.hamsterProfile,
            coins: state.hamsterProfile.coins + seeds,
            experience: state.hamsterProfile.experience + exp,
          };
          updateAndSave('hamsterProfile', newProfile);

          const newStats = {
            ...state.stats,
            totalTasksCompleted: state.stats.totalTasksCompleted + 1,
          };
          updateAndSave('stats', newStats);

          return {
            ...task,
            completed: newCompleted,
            seedsEarned: seeds,
          };
        }

        return { ...task, completed: newCompleted };
      }
      return task;
    });
    updateAndSave('tasks', newTasks);
  };

  const toggleSubTask = (taskId: string, subTaskId: string) => {
    const newTasks = state.tasks.map(task => {
      if (task.id === taskId) {
        const newSubTasks = task.subTasks.map(st =>
          st.id === subTaskId ? { ...st, completed: !st.completed } : st
        );
        const completedCount = newSubTasks.filter(st => st.completed).length;

        // 完成子任務時給予瓜子獎勵
        const subTaskJustCompleted = newSubTasks.find(st => st.id === subTaskId)?.completed;
        if (subTaskJustCompleted) {
          const newProfile = {
            ...state.hamsterProfile,
            coins: state.hamsterProfile.coins + 5, // 每個子任務給 5 瓜子
          };
          updateAndSave('hamsterProfile', newProfile);
        }

        return {
          ...task,
          subTasks: newSubTasks,
          completedSubTasks: completedCount,
        };
      }
      return task;
    });
    updateAndSave('tasks', newTasks);
  };

  const startPomodoro = (session: Omit<PomodoroSession, 'id' | 'endTime' | 'completed'>) => {
    const newSession: PomodoroSession = {
      ...session,
      id: Date.now().toString(),
      startTime: new Date(),
      completed: false,
    };
    const newSessions = [...state.pomodoroSessions, newSession];
    updateAndSave('pomodoroSessions', newSessions);
  };

  const completePomodoro = (id: string) => {
    const newSessions = state.pomodoroSessions.map(session =>
      session.id === id ? { ...session, endTime: new Date(), completed: true } : session
    );
    updateAndSave('pomodoroSessions', newSessions);
  };

  const updateHamsterProfile = (updates: Partial<HamsterProfile>) => {
    const newProfile = { ...state.hamsterProfile, ...updates };
    updateAndSave('hamsterProfile', newProfile);
  };

  return (
    <AppContext.Provider
      value={{
        state,
        addTask,
        updateTask,
        deleteTask,
        toggleTask,
        toggleSubTask,
        startPomodoro,
        completePomodoro,
        updateHamsterProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp 必須在 AppProvider 內使用');
  }
  return context;
};
