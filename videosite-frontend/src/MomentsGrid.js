import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MomentsGrid.css";

function MomentsGrid() {
  const [moments, setMoments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/api/moments/")
      .then((res) => res.json())
      .then((data) => {
        setMoments(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Загрузка...</div>;

  const handleCardClick = (id) => {
    navigate(`/video/${id}`);
  };

  const formatTime = (createdAt) => {
    const date = new Date(createdAt);
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffMinutes < 1) return "только что";
    if (diffMinutes < 60) return `${diffMinutes} мин. назад`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} ч. назад`;

    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="moments-grid">
      {moments.map((moment) => (
        <div
          className="moment-card"
          key={moment.id}
          onClick={() => handleCardClick(moment.id)}
        >
          <div className="moment-img-wrapper">
            <video
              src={moment.video}
              className="moment-img"
              controls={false}
              muted
              loop
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {moment.emotion && (
              <span className="moment-emoji">{moment.emotion}</span>
            )}
          </div>
          <div className="moment-info">
            <div className="moment-username">{moment.user}</div>
            <div className="moment-time">{formatTime(moment.created_at)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MomentsGrid;
