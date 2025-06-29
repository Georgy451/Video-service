import React, { useEffect, useState, useRef } from "react";

function ProfilePage() {
  const [username, setUsername] = useState("");
  const [userVideos, setUserVideos] = useState([]);
  const [avatar, setAvatar] = useState(null); // Состояние для аватара
  const [avatarHover, setAvatarHover] = useState(false);
  const fileInputRef = useRef(null); // Реф для поля загрузки файла

  useEffect(() => {
    // Получение имени пользователя из LocalStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const fetchProfile = async (userId) => {
    try {
      const res = await fetch(`http://localhost:8000/api/profiles/${userId}/`);
      const data = await res.json();
      setAvatar(data.avatar);
    } catch (err) {
      console.error("Ошибка загрузки аватара:", err);
    }
  };

  useEffect(() => {
    // Получение ID пользователя из LocalStorage
    const userId = localStorage.getItem("userId");

    if (userId) {
      // Запрос к API для получения аватара текущего пользователя
      fetchProfile(userId);
    }
  }, []);

  useEffect(() => {
    // Получение ID пользователя из LocalStorage
    const userId = localStorage.getItem("userId");

    if (userId) {
      // Запрос к API для получения видео текущего пользователя
      fetch(`http://localhost:8000/api/moments/?user=${userId}`)
        .then((res) => res.json())
        .then((data) => setUserVideos(data))
        .catch((err) => console.error("Ошибка загрузки данных:", err));
    }
  }, []);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarMouseEnter = () => setAvatarHover(true);
  const handleAvatarMouseLeave = () => setAvatarHover(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);
      const userId = localStorage.getItem("userId");
      formData.append("user_id", userId);
      try {
        const response = await fetch(`http://localhost:8000/api/upload-avatar/`, {
          method: "PATCH",
          body: formData,
        });
        if (response.ok) {
          // После загрузки аватара — повторно получить профиль
          await fetchProfile(userId);
        } else {
          alert("Ошибка загрузки аватара");
        }
      } catch (error) {
        alert("Ошибка соединения с сервером");
      }
    }
  };

  // Функция для удаления видео
  const handleDeleteVideo = async (videoId) => {
    if (!window.confirm('Вы уверены, что хотите удалить это видео?')) return;
    try {
      const response = await fetch(`http://localhost:8000/api/moments/${videoId}/`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setUserVideos((prev) => prev.filter((v) => v.id !== videoId));
      } else {
        alert('Ошибка при удалении видео');
      }
    } catch (error) {
      alert('Ошибка при удалении видео');
    }
  };

  // Преобразование относительного пути аватара в абсолютный URL
  const getAvatarUrl = (avatarPath) => {
    if (!avatarPath) return null;
    if (avatarPath.startsWith('http')) return avatarPath;
    return `http://localhost:8000${avatarPath}`;
  };

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
            background: avatar ? `url(${getAvatarUrl(avatar)}) center/cover` : "linear-gradient(135deg, #ede9fe 60%, #c7d2fe 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
            boxShadow: "0 2px 16px #bbaaff22",
            cursor: "pointer",
            position: "relative",
          }}
          onClick={handleAvatarClick}
          onMouseEnter={handleAvatarMouseEnter}
          onMouseLeave={handleAvatarMouseLeave}
        >
          {!avatar && (
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
          )}
          {avatarHover && (
            <div
              style={{
                position: "absolute",
                bottom: 10,
                left: 0,
                width: "100%",
                textAlign: "center",
                background: "rgba(0,0,0,0.5)",
                color: "#fff",
                borderRadius: "0 0 50% 50%",
                padding: "8px 0 12px 0",
                fontWeight: 600,
                fontSize: 18,
              }}
            >
              Загрузить аватар
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
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
                  src={video.video}
                  controls
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "18px",
                  }}
                />
                <button
                  onClick={() => handleDeleteVideo(video.id)}
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 14,
                    background: "#ffdddd",
                    color: "#a00",
                    border: "none",
                    borderRadius: 8,
                    padding: "4px 12px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Удалить
                </button>
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