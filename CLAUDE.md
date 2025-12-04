# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案概述

倉鼠島生產力工具是一個整合式的生產力應用程式，結合了任務管理、習慣追蹤、時間記錄和番茄鐘功能，並透過可愛的倉鼠主題遊戲化元素來激勵使用者提升生產力。

### 核心功能
- **任務管理**：建立、編輯、刪除和追蹤任務，支援優先級、標籤和截止日期
- **習慣追蹤**：建立每日或每週習慣，追蹤完成情況和連續天數
- **時間追蹤**：記錄各項任務所花費的時間
- **番茄鐘**：專注計時器，包含工作時段和休息時段
- **倉鼠島遊戲化**：透過完成任務獲得經驗值、升級和金幣，裝飾虛擬倉鼠島

## 常用指令

### 開發
```bash
npm run dev          # 啟動開發伺服器 (http://localhost:5173)
npm run build        # 建置生產版本
npm run preview      # 預覽生產版本
npm run lint         # 執行 ESLint 檢查
```

### 類型檢查
```bash
npx tsc --noEmit     # 執行 TypeScript 類型檢查而不產生輸出
```

## 專案架構

### 目錄結構
```
src/
├── components/        # 可重用的 UI 元件
│   └── Layout.tsx    # 主要版面配置元件（標題、導航、頁尾）
├── features/         # 功能模組（按領域組織）
│   ├── tasks/       # 任務管理相關元件和邏輯
│   ├── habits/      # 習慣追蹤相關元件和邏輯
│   ├── time-tracker/ # 時間追蹤相關元件和邏輯
│   └── pomodoro/    # 番茄鐘相關元件和邏輯
├── stores/          # 狀態管理
│   └── AppContext.tsx # 全域應用程式狀態 (React Context)
├── types/           # TypeScript 類型定義
│   └── index.ts     # 核心資料類型 (Task, Habit, TimeEntry, etc.)
├── utils/           # 工具函數
│   ├── storage.ts   # localStorage 封裝
│   └── date.ts      # 日期處理工具
└── hooks/           # 自訂 React Hooks

```

### 狀態管理架構

此專案使用 **React Context API** 進行全域狀態管理：

- **AppContext** (`src/stores/AppContext.tsx`) 提供：
  - 所有功能的集中式狀態（tasks, habits, timeEntries, pomodoroSessions, hamsterProfile, stats）
  - CRUD 操作方法（add, update, delete）
  - 自動持久化到 localStorage

- **使用方式**：
  ```tsx
  import { useApp } from '../stores/AppContext';

  function MyComponent() {
    const { state, addTask, updateTask } = useApp();
    // 使用 state.tasks, addTask(), etc.
  }
  ```

### 資料持久化

- 使用 **localStorage** 儲存所有使用者資料
- `storage.ts` 提供類型安全的 localStorage 操作
- AppContext 中的所有狀態更新會自動同步到 localStorage
- 應用程式啟動時從 localStorage 載入初始狀態

### 核心類型系統

所有資料模型定義在 `src/types/index.ts`：

- `Task` - 任務資料結構（標題、描述、優先級、標籤、截止日期）
- `Habit` - 習慣資料結構（名稱、頻率、目標天數、連續天數）
- `TimeEntry` - 時間記錄（開始/結束時間、時長）
- `PomodoroSession` - 番茄鐘時段（類型、時長、完成狀態）
- `HamsterProfile` - 遊戲化個人資料（等級、經驗值、金幣、道具）
- `Stats` - 統計資料（完成任務數、總時長、連續天數）

## 開發指南

### 新增功能模組

當實作新功能時（例如任務管理、習慣追蹤等）：

1. 在對應的 `src/features/[功能名稱]/` 目錄下建立元件
2. 使用 `useApp()` hook 存取和修改狀態
3. 所有顯示文字使用繁體中文
4. 遵循現有的倉鼠主題配色：
   - 主色：`#FF9E5E` (橘色)
   - 背景：`#FFFAF0` (米白色)
   - 次要背景：`#FFF4E6` (淡橘色)

### 元件開發規範

- 使用 **TypeScript** 並明確定義 props 類型
- 功能元件優先使用函數式元件和 Hooks
- 將可重用的 UI 元件放在 `src/components/`
- 將特定功能的元件放在對應的 `src/features/` 子目錄

### 日期處理

使用 `src/utils/date.ts` 中的工具函數處理日期：
- `formatDate()` - 格式化為 YYYY/MM/DD
- `formatTime()` - 格式化為 HH:MM
- `formatDateTime()` - 完整日期時間
- `isToday()` - 判斷是否為今天
- `isSameDay()` - 比較兩個日期是否同一天

### 語言和本地化

- 所有使用者介面文字必須使用**繁體中文**
- 日期格式使用 `zh-TW` locale
- 注釋可以使用中文或英文，但建議使用中文以保持一致性

## 技術棧

- **框架**: React 19 + TypeScript
- **建置工具**: Vite 7
- **狀態管理**: React Context API
- **樣式**: Inline styles (考慮未來整合 CSS-in-JS 或 Tailwind)
- **程式碼品質**: ESLint + TypeScript ESLint
- **資料持久化**: localStorage

## 未來擴充方向

- 實作每個功能模組的完整 UI（目前僅有基礎架構）
- 整合 CSS 框架或設計系統
- 新增資料匯出/匯入功能
- 實作更多遊戲化元素（成就系統、每日任務、倉鼠道具商店）
- 加入資料視覺化（圖表、統計儀表板）
- 支援深色模式
- PWA 支援（離線使用）
