import type { Difficulty } from '../types';

// 難度對應的電力值和瓜子獎勵
export const DIFFICULTY_CONFIG = {
  easy: {
    energy: 1,
    baseSeeds: 10,
    label: '簡單',
    color: '#90EE90',
  },
  normal: {
    energy: 2,
    baseSeeds: 25,
    label: '普通',
    color: '#FFD700',
  },
  hard: {
    energy: 3,
    baseSeeds: 50,
    label: '困難',
    color: '#FF6347',
  },
  hell: {
    energy: 5,
    baseSeeds: 100,
    label: '地獄',
    color: '#8B008B',
  },
} as const;

// 計算任務完成後的瓜子獎勵
export const calculateSeeds = (
  difficulty: Difficulty,
  subTasksCompleted: number,
  totalSubTasks: number
): number => {
  const baseSeeds = DIFFICULTY_CONFIG[difficulty].baseSeeds;

  // 基礎獎勵
  let totalSeeds: number = baseSeeds;

  // 子任務獎勵：每完成一個子任務給予 5 瓜子
  const subTaskBonus = subTasksCompleted * 5;
  totalSeeds += subTaskBonus;

  // 完成度加成：全部完成給予 20% 加成
  if (totalSubTasks > 0 && subTasksCompleted === totalSubTasks) {
    totalSeeds = Math.floor(totalSeeds * 1.2);
  }

  return totalSeeds;
};

// 計算經驗值（與瓜子相同）
export const calculateExp = (
  difficulty: Difficulty,
  subTasksCompleted: number,
  totalSubTasks: number
): number => {
  return calculateSeeds(difficulty, subTasksCompleted, totalSubTasks);
};
