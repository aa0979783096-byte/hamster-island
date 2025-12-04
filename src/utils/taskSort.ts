import type { Task } from '../types';
import { isSameDay } from './calendar';

// 取得某一天的所有任務
export const getTasksForDay = (tasks: Task[], date: Date): Task[] => {
  return tasks.filter(task => isSameDay(task.startTime, date));
};

// 排序任務：全天行程在前，其餘按開始時間排序
export const sortTasksForDay = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => {
    // 1. 全天行程優先
    if (a.isAllDay && !b.isAllDay) return -1;
    if (!a.isAllDay && b.isAllDay) return 1;

    // 2. 都是全天行程，按建立時間排序
    if (a.isAllDay && b.isAllDay) {
      return a.createdAt.getTime() - b.createdAt.getTime();
    }

    // 3. 都是非全天行程，按開始時間排序
    return a.startTime.getTime() - b.startTime.getTime();
  });
};

// 檢查某一天是否有任務
export const hasTasksOnDay = (tasks: Task[], date: Date): boolean => {
  return tasks.some(task => isSameDay(task.startTime, date));
};

// 計算某一天的任務數量
export const getTaskCountForDay = (tasks: Task[], date: Date): number => {
  return getTasksForDay(tasks, date).length;
};
