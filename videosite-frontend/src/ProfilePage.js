import React, { useEffect, useState } from "react";

const EMOJIS = [
  { icon: "😄", label: "Радость" },
  { icon: "😢", label: "Грусть" },
  { icon: "😠", label: "Злость" },
  { icon: "😍", label: "Влюблённость" },
  { icon: "😎", label: "Крутость" },
];

function ProfilePage() {
  const [username, setUsername] = useState("");
  const [userVideos, setUserVideos] = useState([]);

  useEffect(() => {
    // Получение имени пользователя из LocalStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    // Запрос к API для получения видео пользователя
    fetch("http://localhost:8000/api/videos") // Замените URL на ваш API
      .then((res) => res.json())
      .then((data) => {
        // Фильтрация видео по имени пользователя
        const filteredVideos = data.filter((video) => video.user === username);
        setUserVideos(filteredVideos);
      })
      .catch((err) => console.error("Ошибка загрузки данных:", err));
  }, [username]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f3f0ff 0%, #e9e6fa 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: 60,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: 520,
          background: "rgba(255,255,255,0.85)",
          borderRadius: 32,
          boxShadow: "0 8px 40px #bbaaff33",
          padding: "48px 36px 36px 36px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Аватар */}
        <div
          style={{
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #ede9fe 60%, #c7d2fe 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
            boxShadow: "0 2px 16px #bbaaff22",
          }}
        >
          <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
            <circle
              cx="55"
              cy="55"
              r="54"
              stroke="#a78bfa"
              strokeWidth="2"
              fill="#f3f0ff"
            />
            <ellipse cx="55" cy="50" rx="28" ry="26" stroke="#a78bfa" strokeWidth="2" />
            <ellipse cx="55" cy="90" rx="36" ry="18" stroke="#a78bfa" strokeWidth="2" />
          </svg>
        </div>
        {/* Имя */}
        <div
          style={{
            fontSize: 38,
            fontWeight: 700,
            color: "#22223b",
            marginBottom: 10,
            letterSpacing: 1,
          }}
        >
          {username || "Гость"}
        </div>

        {/* Эмоции */}
        <div
          style={{
            background: "#f6f4fd",
            borderRadius: 20,
            padding: "18px 0",
            marginBottom: 32,
            display: "flex",
            justifyContent: "center",
            gap: 22,
            boxShadow: "0 2px 12px #bbaaff11",
          }}
        >
          {EMOJIS.map((em) => (
            <span
              key={em.icon}
              title={em.label}
              style={{
                fontSize: 44,
                cursor: "pointer",
                transition: "transform 0.15s",
                userSelect: "none",
              }}
            >
              {em.icon}
            </span>
          ))}
        </div>
        {/* Сетка видео */}
        <div style={{ width: "100%", marginBottom: 12 }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "#6d28d9",
              marginBottom: 18,
              letterSpacing: 0.5,
            }}
          >
            Мои видео
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 22,
            }}
          >
            {userVideos.map((video) => (
              <div
                key={video.id}
                style={{
                  background: "#f3f0ff",
                  borderRadius: 18,
                  boxShadow: "0 2px 12px #bbaaff11",
                  position: "relative",
                  overflow: "hidden",
                  aspectRatio: "16/9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <video
                  src={video.url}
                  controls
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "18px",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 14,
                    background: "#fff9",
                    color: "#333",
                    borderRadius: 8,
                    padding: "2px 10px",
                    fontWeight: 600,
                    fontSize: 15,
                  }}
                >
                  0:05
                </span>
                <span
                  style={{
                    position: "absolute",
                    left: 12,
                    bottom: 10,
                    fontSize: 28,
                  }}
                >
                  {video.emotion}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;