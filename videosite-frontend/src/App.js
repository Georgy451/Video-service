import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import MomentsGrid from "./MomentsGrid";
import AddVideoPage from "./AddVideoPage";
import ProfilePage from "./ProfilePage";
import ExplorePage from "./ExplorePage";
import VideoDetailPage from "./VideoDetailPage"; // Импорт нового компонента

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterPage />} /> {/* Главная — регистрация */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/base" element={
          <div>
            <header style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '24px 32px 0 32px'
            }}>
              <h1 style={{fontWeight: 700, fontSize: '2rem'}}>Мозаика</h1>
              <nav style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <a
                  href="/explore"
                  style={{
                    background: '#2563eb',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 18px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    marginRight: '16px',
                    textDecoration: 'none'
                  }}
                >
                  Найти
                </a>
                <a
                  href="/add"
                  style={{
                    background: '#2563eb',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 18px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    marginRight: '16px',
                    textDecoration: 'none'
                  }}
                >
                  Добавить момент
                </a>
                <a
                  href="/profile"
                  style={{
                    background: '#2563eb',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 18px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    textDecoration: 'none'
                  }}
                >
                  Аккаунт
                </a>
              </nav>
            </header>
            <main style={{padding: '0 32px 32px 32px'}}>
              <MomentsGrid />
            </main>
          </div>
        } />
        <Route path="/add" element={<AddVideoPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/video/:id" element={<VideoDetailPage />} /> {/* Новый маршрут */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

