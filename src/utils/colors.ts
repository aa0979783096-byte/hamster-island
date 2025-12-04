// 預設顏色選項（供使用者選擇）
export interface ColorOption {
  id: string;
  name: string;
  value: string;
}

export const COLOR_OPTIONS: ColorOption[] = [
  { id: 'red', name: '紅色', value: '#FF6B6B' },
  { id: 'orange', name: '橘色', value: '#FF9E5E' },
  { id: 'yellow', name: '黃色', value: '#FFD93D' },
  { id: 'green', name: '綠色', value: '#50C878' },
  { id: 'teal', name: '青色', value: '#17A2B8' },
  { id: 'blue', name: '藍色', value: '#4A90E2' },
  { id: 'purple', name: '紫色', value: '#9B59B6' },
  { id: 'pink', name: '粉色', value: '#E91E63' },
  { id: 'brown', name: '棕色', value: '#8D6E63' },
  { id: 'gray', name: '灰色', value: '#78909C' },
];

// 預設顏色（新增任務時的預設值）
export const DEFAULT_COLOR = COLOR_OPTIONS[1].value; // 橘色
