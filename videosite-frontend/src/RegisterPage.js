import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await fetch("http://localhost:8001/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });
      if (response.ok) {
        setSuccess("Пользователь успешно зарегистрирован!");
        setTimeout(() => navigate("/login"), 1200);
      } else {
        const data = await response.json();
        setError(
          data?.username?.[0] ||
          data?.email?.[0] ||
          data?.password?.[0] ||
          "Ошибка регистрации"
        );
      }
    } catch {
      setError("Ошибка соединения с сервером");
    }
  };

  return (
    <div className="register-bg">
      <div className="register-card">
        <h2 className="register-logo">Mosaic</h2>
        <div className="auth-header">
          <h1>Регистрация</h1>
          <button className="auth-switch" onClick={() => navigate("/login")}>
            Войти
          </button>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Имя"
            className="auth-input"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            className="auth-input"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            className="auth-input"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button className="auth-submit" type="submit">
            Зарегистрироваться
          </button>
        </form>
        {error && <div style={{ color: "#e11d48", marginTop: 12 }}>{error}</div>}
        {success && <div style={{ color: "#22c55e", marginTop: 12 }}>{success}</div>}
      </div>
    </div>
  );
}