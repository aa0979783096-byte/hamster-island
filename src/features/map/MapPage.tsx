import { useState } from 'react';
import { HamsterVillagePage } from '../village/HamsterVillagePage';
import { TimeGapPage } from '../story/TimeGapPage';

type IslandView = 'map' | 'village' | 'timegap';

export const MapPage = () => {
  const [currentView, setCurrentView] = useState<IslandView>('map');

  const islands = [
    { id: 'timegap', name: '時間縫隙', icon: '⏳', color: '#9B59B6', view: 'timegap' as IslandView },
    { id: 'village', name: '倉鼠村', icon: '🏡', color: '#FF9E5E', view: 'village' as IslandView },
    { id: 'leaderboard', name: '風雲榜', icon: '🏆', color: '#FFD93D', view: null },
    { id: 'shop', name: '商城', icon: '🛒', color: '#50C878', view: null },
    { id: 'dock', name: '碼頭', icon: '⛵', color: '#4A90E2', view: null },
  ];

  const handleIslandClick = (island: typeof islands[0]) => {
    if (island.view) {
      setCurrentView(island.view);
    } else {
      alert(`${island.name} - 即將推出！`);
    }
  };

  // 如果正在查看某個島嶼，顯示該島嶼的頁面
  if (currentView === 'village') {
    return (
      <div>
        <button
          onClick={() => setCurrentView('map')}
          style={{
            position: 'fixed',
            top: '80px',
            left: '20px',
            zIndex: 100,
            padding: '0.75rem 1.5rem',
            background: '#FF9E5E',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          }}
        >
          ← 返回地圖
        </button>
        <HamsterVillagePage />
      </div>
    );
  }

  if (currentView === 'timegap') {
    return (
      <div>
        <button
          onClick={() => setCurrentView('map')}
          style={{
            position: 'fixed',
            top: '80px',
            left: '20px',
            zIndex: 100,
            padding: '0.75rem 1.5rem',
            background: '#9B59B6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          }}
        >
          ← 返回地圖
        </button>
        <TimeGapPage />
      </div>
    );
  }

  // 地圖主頁面
  return (
    <div style={{
      width: '100%',
      minHeight: '100%',
      background: 'linear-gradient(180deg, #87CEEB 0%, #B0E0E6 50%, #ADD8E6 100%)',
      padding: 'clamp(1rem, 3vw, 2rem)',
      boxSizing: 'border-box',
    }}>
      <div style={{
        width: '100%',
        padding: 'clamp(0.5rem, 2vw, 1rem)',
      }}>
        <h2 style={{
          textAlign: 'center',
          color: '#2C5F7F',
          fontSize: '2.5rem',
          marginBottom: '1rem',
          textShadow: '2px 2px 4px rgba(255,255,255,0.5)',
        }}>
          🗺️ 倉鼠島地圖
        </h2>

        <p style={{
          textAlign: 'center',
          color: '#2C5F7F',
          fontSize: '1.1rem',
          marginBottom: '2rem',
        }}>
          探索島上的各個區域
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          padding: '2rem',
        }}>
          {islands.map((island) => (
            <div
              key={island.id}
              onClick={() => handleIslandClick(island)}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem',
                textAlign: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transition: 'all 0.3s ease',
                border: `4px solid ${island.color}`,
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
            >
              {/* 新功能標籤 */}
              {island.view && (
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  background: '#FF6B6B',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                }}>
                  NEW
                </div>
              )}

              <div style={{
                fontSize: '4rem',
                marginBottom: '1rem',
              }}>
                {island.icon}
              </div>
              <h3 style={{
                color: island.color,
                fontSize: '1.5rem',
                margin: 0,
                fontWeight: 'bold',
              }}>
                {island.name}
              </h3>

              {/* 狀態提示 */}
              <p style={{
                marginTop: '0.5rem',
                color: island.view ? '#50C878' : '#999',
                fontSize: '0.9rem',
              }}>
                {island.view ? '✓ 已開放' : '即將推出'}
              </p>
            </div>
          ))}
        </div>

        {/* 裝飾性雲朵 */}
        <div style={{
          position: 'fixed',
          top: '10%',
          left: '5%',
          fontSize: '3rem',
          opacity: 0.6,
          animation: 'float 6s ease-in-out infinite',
          pointerEvents: 'none',
        }}>
          ☁️
        </div>
        <div style={{
          position: 'fixed',
          top: '20%',
          right: '10%',
          fontSize: '2.5rem',
          opacity: 0.5,
          animation: 'float 8s ease-in-out infinite',
          pointerEvents: 'none',
        }}>
          ☁️
        </div>
        <div style={{
          position: 'fixed',
          bottom: '15%',
          left: '15%',
          fontSize: '2rem',
          opacity: 0.4,
          animation: 'float 7s ease-in-out infinite',
          pointerEvents: 'none',
        }}>
          ☁️
        </div>
      </div>

      {/* CSS 動畫 */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};
