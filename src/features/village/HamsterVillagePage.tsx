import { useState } from 'react';
import { CHARACTERS } from '../../data/characters';
import type { HamsterCharacter } from '../../types';

export const HamsterVillagePage = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<HamsterCharacter | null>(null);

  return (
    <div style={{
      width: '100%',
      minHeight: '100%',
      background: 'linear-gradient(180deg, #FFE4B5 0%, #F5DEB3 100%)',
      padding: 'clamp(1rem, 3vw, 2rem)',
      boxSizing: 'border-box',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* 標題 */}
        <h2 style={{
          textAlign: 'center',
          color: '#8B4513',
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
          marginBottom: '1rem',
        }}>
          🏡 倉鼠村
        </h2>
        <p style={{
          textAlign: 'center',
          color: '#666',
          marginBottom: '2rem',
          fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
        }}>
          探索村落，認識可愛的倉鼠居民們
        </p>

        {/* 角色網格 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}>
          {CHARACTERS.map((character) => (
            <div
              key={character.id}
              onClick={() => character.unlocked && setSelectedCharacter(character)}
              style={{
                background: character.unlocked ? 'white' : '#e0e0e0',
                borderRadius: '16px',
                padding: '1.5rem',
                textAlign: 'center',
                cursor: character.unlocked ? 'pointer' : 'not-allowed',
                boxShadow: character.unlocked
                  ? '0 4px 12px rgba(139, 69, 19, 0.15)'
                  : '0 2px 6px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                opacity: character.unlocked ? 1 : 0.6,
                border: character.isFavorite ? '3px solid #FFD700' : 'none',
              }}
              onMouseEnter={(e) => {
                if (character.unlocked) {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 69, 19, 0.25)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = character.unlocked
                  ? '0 4px 12px rgba(139, 69, 19, 0.15)'
                  : '0 2px 6px rgba(0, 0, 0, 0.1)';
              }}
            >
              {/* 頭像 */}
              <div style={{
                fontSize: '4rem',
                marginBottom: '0.5rem',
                filter: character.unlocked ? 'none' : 'grayscale(100%)',
              }}>
                {character.unlocked ? character.avatar : '❓'}
              </div>

              {/* 名稱 */}
              <h3 style={{
                margin: '0.5rem 0',
                color: character.unlocked ? '#8B4513' : '#999',
                fontSize: '1.2rem',
              }}>
                {character.unlocked ? character.name : '???'}
              </h3>

              {/* 個性 */}
              {character.unlocked && (
                <p style={{
                  fontSize: '0.85rem',
                  color: '#666',
                  margin: '0.5rem 0',
                }}>
                  {character.personality}
                </p>
              )}

              {/* 最愛標記 */}
              {character.isFavorite && (
                <div style={{
                  marginTop: '0.5rem',
                  fontSize: '1.2rem',
                }}>
                  ⭐ 最愛
                </div>
              )}

              {/* 未解鎖提示 */}
              {!character.unlocked && (
                <p style={{
                  fontSize: '0.85rem',
                  color: '#999',
                  marginTop: '0.5rem',
                }}>
                  第 {character.chapterUnlocked} 章解鎖
                </p>
              )}
            </div>
          ))}
        </div>

        {/* 統計信息 */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '12px',
          padding: '1.5rem',
          textAlign: 'center',
        }}>
          <p style={{
            margin: 0,
            color: '#8B4513',
            fontSize: '1.1rem',
          }}>
            已解鎖角色：{CHARACTERS.filter(c => c.unlocked).length} / {CHARACTERS.length}
          </p>
        </div>
      </div>

      {/* 角色詳情彈窗 */}
      {selectedCharacter && (
        <div
          onClick={() => setSelectedCharacter(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2rem',
              maxWidth: '500px',
              width: '100%',
              maxHeight: '80vh',
              overflow: 'auto',
            }}
          >
            {/* 頭像 */}
            <div style={{
              fontSize: '6rem',
              textAlign: 'center',
              marginBottom: '1rem',
            }}>
              {selectedCharacter.avatar}
            </div>

            {/* 名稱 */}
            <h2 style={{
              textAlign: 'center',
              color: '#8B4513',
              margin: '0.5rem 0',
            }}>
              {selectedCharacter.name}
              <span style={{
                fontSize: '1rem',
                color: '#999',
                marginLeft: '0.5rem',
              }}>
                ({selectedCharacter.nameEn})
              </span>
            </h2>

            {/* 個性 */}
            <div style={{
              background: '#FFF4E6',
              padding: '1rem',
              borderRadius: '12px',
              marginBottom: '1rem',
            }}>
              <p style={{
                margin: 0,
                color: '#666',
                fontSize: '0.95rem',
              }}>
                <strong>個性：</strong>{selectedCharacter.personality}
              </p>
            </div>

            {/* 座右銘 */}
            <div style={{
              background: '#E6F3FF',
              padding: '1rem',
              borderRadius: '12px',
              marginBottom: '1rem',
              borderLeft: '4px solid #4A90E2',
            }}>
              <p style={{
                margin: 0,
                color: '#333',
                fontStyle: 'italic',
                fontSize: '1rem',
              }}>
                「{selectedCharacter.motto}」
              </p>
            </div>

            {/* 簡介 */}
            <div style={{
              marginBottom: '1.5rem',
            }}>
              <h3 style={{
                color: '#8B4513',
                fontSize: '1.1rem',
                marginBottom: '0.5rem',
              }}>
                簡介
              </h3>
              <p style={{
                color: '#666',
                lineHeight: 1.6,
                margin: 0,
              }}>
                {selectedCharacter.description}
              </p>
            </div>

            {/* 按鈕 */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '1.5rem',
            }}>
              <button
                onClick={() => {
                  // TODO: 實現設為最愛功能
                  alert('設為最愛功能開發中...');
                }}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: selectedCharacter.isFavorite ? '#FFD700' : '#F0F0F0',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  color: selectedCharacter.isFavorite ? '#8B4513' : '#666',
                }}
              >
                {selectedCharacter.isFavorite ? '⭐ 已設為最愛' : '設為最愛'}
              </button>
              <button
                onClick={() => setSelectedCharacter(null)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: '#8B4513',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
