import { useState } from 'react';
import { CHAPTERS, STORY_FRAGMENTS } from '../../data/storyFragments';
import type { StoryFragment } from '../../types';

export const TimeGapPage = () => {
  const [selectedFragment, setSelectedFragment] = useState<StoryFragment | null>(null);
  const chapter = CHAPTERS[0]; // 目前只有第一章

  const getFragments = () => {
    return STORY_FRAGMENTS.filter(f => f.chapterId === chapter.id);
  };

  const handleFragmentClick = (fragment: StoryFragment) => {
    if (fragment.unlocked) {
      setSelectedFragment(fragment);
    } else {
      alert(`需要 ${fragment.powerCost} 電力解鎖此章節\n\n（電力系統開發中...）`);
    }
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100%',
      background: 'linear-gradient(180deg, #2C2C54 0%, #474787 100%)',
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
          color: '#E6E6FA',
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
          marginBottom: '0.5rem',
        }}>
          ⏳ 時間縫隙
        </h2>
        <p style={{
          textAlign: 'center',
          color: '#B0B0E0',
          marginBottom: '2rem',
          fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
        }}>
          探索倉鼠島的秘密故事
        </p>

        {/* 章節標題 */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '1.5rem',
          marginBottom: '2rem',
          textAlign: 'center',
        }}>
          <h3 style={{
            color: '#FFD700',
            fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
            margin: '0 0 0.5rem 0',
          }}>
            第 {chapter.chapterNumber} 章：{chapter.title}
          </h3>
          <p style={{
            color: '#B0B0E0',
            margin: 0,
            fontSize: '0.95rem',
          }}>
            {chapter.titleEn}
          </p>
          <p style={{
            color: '#90EE90',
            marginTop: '1rem',
            fontSize: '1rem',
          }}>
            進度：{STORY_FRAGMENTS.filter(f => f.unlocked).length} / {chapter.totalFragments}
          </p>
        </div>

        {/* 碎片網格 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {getFragments().map((fragment) => (
            <div
              key={fragment.id}
              onClick={() => handleFragmentClick(fragment)}
              style={{
                background: fragment.unlocked
                  ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))'
                  : 'rgba(0, 0, 0, 0.3)',
                borderRadius: '16px',
                padding: '1.5rem',
                cursor: fragment.unlocked ? 'pointer' : 'not-allowed',
                border: fragment.unlocked
                  ? '2px solid rgba(255, 215, 0, 0.3)'
                  : '2px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
                opacity: fragment.unlocked ? 1 : 0.5,
              }}
              onMouseEnter={(e) => {
                if (fragment.unlocked) {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 215, 0, 0.3)';
                  e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.6)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = fragment.unlocked
                  ? 'rgba(255, 215, 0, 0.3)'
                  : 'rgba(255, 255, 255, 0.1)';
              }}
            >
              {/* 編號 */}
              <div style={{
                fontSize: '2.5rem',
                color: fragment.unlocked ? '#FFD700' : '#666',
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                textAlign: 'center',
              }}>
                {fragment.unlocked ? fragment.fragmentNumber : '🔒'}
              </div>

              {/* 標題 */}
              <h4 style={{
                color: fragment.unlocked ? '#E6E6FA' : '#999',
                textAlign: 'center',
                marginBottom: '0.5rem',
                fontSize: '1.1rem',
              }}>
                {fragment.unlocked ? fragment.title : '???'}
              </h4>

              {/* 英文標題 */}
              {fragment.unlocked && (
                <p style={{
                  color: '#B0B0E0',
                  textAlign: 'center',
                  fontSize: '0.85rem',
                  margin: '0.5rem 0',
                  fontStyle: 'italic',
                }}>
                  {fragment.titleEn}
                </p>
              )}

              {/* 解鎖狀態 */}
              <div style={{
                textAlign: 'center',
                marginTop: '1rem',
                padding: '0.5rem',
                background: fragment.unlocked
                  ? 'rgba(144, 238, 144, 0.2)'
                  : 'rgba(255, 165, 0, 0.2)',
                borderRadius: '8px',
              }}>
                <p style={{
                  margin: 0,
                  color: fragment.unlocked ? '#90EE90' : '#FFA500',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                }}>
                  {fragment.unlocked
                    ? '✓ 已解鎖'
                    : `🔋 需要 ${fragment.powerCost} 電力`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 閱讀彈窗 */}
      {selectedFragment && (
        <div
          onClick={() => setSelectedFragment(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.9)',
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
              background: 'linear-gradient(135deg, #2C2C54 0%, #474787 100%)',
              borderRadius: '20px',
              padding: '2rem',
              maxWidth: '700px',
              width: '100%',
              maxHeight: '80vh',
              overflow: 'auto',
              border: '2px solid #FFD700',
            }}
          >
            {/* 標題 */}
            <div style={{
              textAlign: 'center',
              marginBottom: '1.5rem',
              borderBottom: '2px solid rgba(255, 215, 0, 0.3)',
              paddingBottom: '1rem',
            }}>
              <div style={{
                fontSize: '2rem',
                color: '#FFD700',
                marginBottom: '0.5rem',
              }}>
                Fragment {selectedFragment.fragmentNumber}
              </div>
              <h2 style={{
                color: '#E6E6FA',
                margin: '0.5rem 0',
                fontSize: '1.5rem',
              }}>
                {selectedFragment.title}
              </h2>
              <p style={{
                color: '#B0B0E0',
                margin: 0,
                fontStyle: 'italic',
              }}>
                {selectedFragment.titleEn}
              </p>
            </div>

            {/* 內容 */}
            <div style={{
              color: '#E6E6FA',
              lineHeight: 2,
              fontSize: '1.05rem',
              marginBottom: '2rem',
              whiteSpace: 'pre-wrap',
            }}>
              {selectedFragment.content}
            </div>

            {/* 導航按鈕 */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
            }}>
              <button
                onClick={() => {
                  const currentIndex = STORY_FRAGMENTS.findIndex(
                    f => f.id === selectedFragment.id
                  );
                  if (currentIndex > 0 && STORY_FRAGMENTS[currentIndex - 1].unlocked) {
                    setSelectedFragment(STORY_FRAGMENTS[currentIndex - 1]);
                  }
                }}
                disabled={
                  STORY_FRAGMENTS.findIndex(f => f.id === selectedFragment.id) === 0 ||
                  !STORY_FRAGMENTS[STORY_FRAGMENTS.findIndex(f => f.id === selectedFragment.id) - 1]?.unlocked
                }
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(255, 215, 0, 0.2)',
                  border: '2px solid #FFD700',
                  borderRadius: '8px',
                  color: '#FFD700',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                ← 上一節
              </button>
              <button
                onClick={() => setSelectedFragment(null)}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#FFD700',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#2C2C54',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                關閉
              </button>
              <button
                onClick={() => {
                  const currentIndex = STORY_FRAGMENTS.findIndex(
                    f => f.id === selectedFragment.id
                  );
                  if (
                    currentIndex < STORY_FRAGMENTS.length - 1 &&
                    STORY_FRAGMENTS[currentIndex + 1].unlocked
                  ) {
                    setSelectedFragment(STORY_FRAGMENTS[currentIndex + 1]);
                  }
                }}
                disabled={
                  STORY_FRAGMENTS.findIndex(f => f.id === selectedFragment.id) ===
                    STORY_FRAGMENTS.length - 1 ||
                  !STORY_FRAGMENTS[STORY_FRAGMENTS.findIndex(f => f.id === selectedFragment.id) + 1]?.unlocked
                }
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(255, 215, 0, 0.2)',
                  border: '2px solid #FFD700',
                  borderRadius: '8px',
                  color: '#FFD700',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                下一節 →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
