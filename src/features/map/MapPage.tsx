export const MapPage = () => {
  const islands = [
    { id: 'timegap', name: '時間縫隙', icon: '⏳', color: '#9B59B6' },
    { id: 'village', name: '倉鼠村', icon: '🏡', color: '#FF9E5E' },
    { id: 'leaderboard', name: '風雲榜', icon: '🏆', color: '#FFD93D' },
    { id: 'shop', name: '商城', icon: '🛒', color: '#50C878' },
    { id: 'dock', name: '碼頭', icon: '⛵', color: '#4A90E2' },
  ];

  const handleIslandClick = (name: string) => {
    alert(`${name} - 即將推出！`);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #87CEEB 0%, #B0E0E6 50%, #ADD8E6 100%)',
      padding: '2rem',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <h2 style={{
          textAlign: 'center',
          color: '#2C5F7F',
          fontSize: '2.5rem',
          marginBottom: '3rem',
          textShadow: '2px 2px 4px rgba(255,255,255,0.5)',
        }}>
          🗺️ 倉鼠島地圖
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          padding: '2rem',
        }}>
          {islands.map((island) => (
            <div
              key={island.id}
              onClick={() => handleIslandClick(island.name)}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem',
                textAlign: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transition: 'all 0.3s ease',
                border: `4px solid ${island.color}`,
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
