import React, { useState, useEffect } from 'react';

const EMOJIS = [
  { icon: '😄', label: 'Радость' },
  { icon: '😢', label: 'Грусть' },
  { icon: '😠', label: 'Злость' },
  { icon: '😍', label: 'Влюблённость' },
  { icon: '😎', label: 'Крутость' },
];

function ExplorePage() {
  const [city, setCity] = useState('');
  const [user, setUser] = useState('');
  const [emotion, setEmotion] = useState('');
  const [moments, setMoments] = useState([]);

  useEffect(() => {
    // Запрос к API для получения текущих видео пользователей
    fetch('http://localhost:8000/api/moments/') // Замените URL на ваш API
      .then((res) => res.json())
      .then((data) => setMoments(data))
      .catch((err) => console.error('Ошибка загрузки данных:', err));
  }, []);

  // Фильтрация
  const filtered = moments.filter((m) =>
    (city === '' || m.city?.toLowerCase().includes(city.toLowerCase())) &&
    (user === '' || m.user?.toLowerCase().includes(user.toLowerCase())) &&
    (emotion === '' || m.emotion === emotion)
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #f3f0ff 0%, #e9e6fa 100%)',
      padding: '48px 0',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        maxWidth: 900,
        margin: '0 auto',
        background: 'rgba(255,255,255,0.92)',
        borderRadius: 32,
        boxShadow: '0 8px 40px #bbaaff33',
        padding: '36px 40px 40px 40px'
      }}>
        <h2 style={{
          fontSize: 32,
          fontWeight: 700,
          color: '#6d28d9',
          marginBottom: 28,
          letterSpacing: 1
        }}>
          Explore Moments
        </h2>
        {/* Фильтры */}
        <div style={{
          display: 'flex',
          gap: 24,
          marginBottom: 32,
          flexWrap: 'wrap'
        }}>
          <div>
            <label style={{ fontWeight: 500, fontSize: 16, color: '#6d28d9' }}>Город</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Введите город"
              style={{
                display: 'block',
                marginTop: 6,
                padding: '10px 16px',
                borderRadius: 10,
                border: '1.5px solid #e5e7eb',
                fontSize: 16,
                background: '#f9fafb',
                minWidth: 180
              }}
            />
          </div>
          <div>
            <label style={{ fontWeight: 500, fontSize: 16, color: '#6d28d9' }}>Имя пользователя</label>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Введите имя"
              style={{
                display: 'block',
                marginTop: 6,
                padding: '10px 16px',
                borderRadius: 10,
                border: '1.5px solid #e5e7eb',
                fontSize: 16,
                background: '#f9fafb',
                minWidth: 180
              }}
            />
          </div>
          <div>
            <label style={{ fontWeight: 500, fontSize: 16, color: '#6d28d9' }}>Эмоция</label>
            <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
              {EMOJIS.map((em) => (
                <button
                  key={em.icon}
                  type="button"
                  onClick={() => setEmotion(emotion === em.icon ? '' : em.icon)}
                  style={{
                    fontSize: 28,
                    background: emotion === em.icon ? '#ede9fe' : 'none',
                    border: emotion === em.icon ? '2px solid #8b5cf6' : '2px solid transparent',
                    borderRadius: '50%',
                    padding: 4,
                    cursor: 'pointer',
                    transition: 'border 0.2s'
                  }}
                  aria-label={em.label}
                >
                  {em.icon}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Сетка моментов */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 28
        }}>
          {filtered.length === 0 && (
            <div style={{ color: '#888', fontSize: 20, gridColumn: '1/-1', textAlign: 'center' }}>
              Нет подходящих моментов
            </div>
          )}
          {filtered.map((m) => (
            <div key={m.id} style={{
              background: '#f3f0ff',
              borderRadius: 18,
              boxShadow: '0 2px 12px #bbaaff11',
              position: 'relative',
              overflow: 'hidden',
              aspectRatio: '16/9',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0
            }}>
              <video
                src={m.video}
                controls
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '18px'
                }}
              />
              <span style={{
                position: 'absolute',
                top: 10,
                right: 14,
                background: '#fff9',
                color: '#333',
                borderRadius: 8,
                padding: '2px 10px',
                fontWeight: 600,
                fontSize: 15
              }}>
                0:05
              </span>
              <span style={{
                position: 'absolute',
                left: 12,
                bottom: 10,
                fontSize: 28
              }}>
                {m.emotion}
              </span>
              <div style={{
                position: 'absolute',
                left: 12,
                top: 10,
                color: '#6d28d9',
                fontWeight: 600,
                fontSize: 15
              }}>
                {m.user}
              </div>
              <div style={{
                position: 'absolute',
                right: 12,
                bottom: 10,
                color: '#888',
                fontSize: 14
              }}>
                {m.city}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExplorePage;
