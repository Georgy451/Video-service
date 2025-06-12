import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8001/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Ответ от сервера:", data); // Проверяем ответ
        localStorage.setItem("userId", data.id); // Сохраняем id пользователя
        localStorage.setItem("username", username); // Сохраняем имя пользователя
        navigate(data.redirect_url); // Перенаправление
      } else {
        const errorData = await response.json();
        alert(errorData.detail || "Ошибка входа");
      }
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
      alert("Произошла ошибка. Попробуйте снова.");
    }
  };

  return (
    <div className="register-bg">
      <div className="register-card">
        <h2 className="register-logo">Mosaic</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Логин"
            className="auth-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Пароль"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="auth-submit" type="submit">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}