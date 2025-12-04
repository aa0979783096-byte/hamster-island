// 任務管理類型定義
export type TaskType = 'task' | 'challenge';
export type Difficulty = 'easy' | 'normal' | 'hard' | 'hell';

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  type: TaskType; // 任務 or 自我挑戰
  title: string;
  description?: string;
  difficulty: Difficulty; // 簡單(1) / 普通(2) / 困難(3) / 地獄(5)
  startTime: Date;
  endTime: Date;
  isAllDay: boolean; // 是否為全天行程
  category: string; // 分類：學業、健身、工作、自我提升等（用於整理）
  color: string; // 顏色標籤：用於視覺辨識（獨立於分類）
  subTasks: SubTask[]; // 子任務列表
  completed: boolean;
  completedSubTasks: number; // 已完成的子任務數量
  seedsEarned: number; // 獲得的瓜子數量
  createdAt: Date;
}

// 習慣追蹤類型定義
export interface Habit {
  id: string;
  name: string;
  description?: string;
  frequency: 'daily' | 'weekly';
  targetDays: number[];
  completedDates: Date[];
  streak: number;
  createdAt: Date;
}

// 時間追蹤類型定義
export interface TimeEntry {
  id: string;
  taskId?: string;
  description: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // 以分鐘為單位
  tags: string[];
}

// 番茄鐘類型定義
export type PomodoroMode = 'focus' | 'relax'; // 專注模式 / 悠閒模式
export type PomodoroType = 'work' | 'break'; // 工作 / 休息

export interface PomodoroSession {
  id: string;
  taskId?: string; // 綁定的任務 ID
  mode: PomodoroMode; // 專注 / 悠閒
  type: PomodoroType; // 工作 / 休息
  duration: number; // 以分鐘為單位
  startTime: Date;
  endTime?: Date;
  completed: boolean;
  coinsEarned: number; // 獲得的瓜子數量
  interrupted: boolean; // 是否被中斷（悠閒模式）
}

// 番茄鐘設定
export interface PomodoroSettings {
  mode: PomodoroMode;
  focusMinutes: number;
  breakMinutes: number;
  autoStartBreak: boolean;
  autoStartNextPomodoro: boolean;
  soundEnabled: boolean;
  animationEnabled: boolean;
}

// 倉鼠島遊戲化元素
export interface HamsterProfile {
  name: string;
  level: number;
  experience: number;
  coins: number;
  items: HamsterItem[];
}

export interface HamsterItem {
  id: string;
  name: string;
  type: 'habitat' | 'decoration' | 'food';
  cost: number;
  owned: boolean;
}

// 統計數據類型
export interface Stats {
  totalTasksCompleted: number;
  totalTimeTracked: number; // 以分鐘為單位
  currentStreak: number;
  longestStreak: number;
  pomodorosCompleted: number;
}
