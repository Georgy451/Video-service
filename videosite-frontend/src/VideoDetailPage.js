import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./VideoDetailPage.css";

function VideoDetailPage() {
  const { id } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // Загрузка данных видео с сервера
    fetch(`http://localhost:8000/api/moments/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setVideoData(data);
        setComments(data.comments || []);
      })
      .catch((err) => console.error("Ошибка загрузки видео:", err));
  }, [id]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  if (!videoData) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="video-detail-card">
      <div className="video-detail-header">
        <div className="video-detail-avatar"></div>
        <span className="video-detail-user">{videoData.user}</span>
      </div>
      <div className="video-detail-video">
        <video
          src={videoData.video}
          controls
          style={{ width: "100%", height: "100%", borderRadius: "12px" }}
        />
      </div>
      <div className="video-detail-footer">
        <div className="video-detail-likes">
          ❤️ <span>{videoData.likes}</span>
        </div>
        <div className="video-detail-comments">
          💬 <span>{comments.length}</span>
        </div>
      </div>
      <div className="comments-section">
        <h3>Комментарии</h3>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
        <div className="add-comment">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Добавить комментарий..."
          />
          <button onClick={handleAddComment}>Отправить</button>
        </div>
      </div>
    </div>
  );
}

export default VideoDetailPage;