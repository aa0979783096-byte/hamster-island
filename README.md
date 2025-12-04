# 🐹 倉鼠島生產力工具

一個整合任務管理、習慣追蹤、時間記錄和番茄鐘的生產力應用程式，透過可愛的倉鼠主題遊戲化系統讓您的工作更有趣！

## 功能特色

- ✓ **任務管理** - 建立和追蹤您的待辦事項，支援優先級和標籤
- ⭐ **習慣追蹤** - 培養好習慣，追蹤連續天數
- ⏱️ **時間追蹤** - 記錄各項任務花費的時間
- 🍅 **番茄鐘** - 使用番茄工作法提升專注力
- 🏝️ **倉鼠島** - 透過完成任務獲得經驗值和金幣，打造專屬倉鼠島

## 快速開始

### 安裝依賴
```bash
npm install
```

### 啟動開發伺服器
```bash
npm run dev
```

應用程式將在 `http://localhost:5173` 啟動

### 建置生產版本
```bash
npm run build
```

### 預覽生產版本
```bash
npm run preview
```

## 技術棧

- ⚛️ React 19 + TypeScript
- ⚡ Vite 7 (快速建置和熱模組替換)
- 🎨 Inline Styles (未來可擴充 CSS 框架)
- 💾 localStorage (資料持久化)
- 🔍 ESLint (程式碼品質檢查)

## 專案架構

```
src/
├── components/      # 可重用的 UI 元件
├── features/        # 功能模組（任務、習慣、時間追蹤等）
├── stores/          # 狀態管理 (React Context)
├── types/           # TypeScript 類型定義
├── utils/           # 工具函數
└── hooks/           # 自訂 React Hooks
```

詳細的開發指南請參考 [CLAUDE.md](./CLAUDE.md)

## 開發規範

- 所有介面文字使用繁體中文
- 使用 TypeScript 並明確定義類型
- 遵循倉鼠主題配色方案
- 資料自動儲存到 localStorage

## 授權

私有專案
